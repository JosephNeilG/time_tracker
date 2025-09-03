import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TASKS } from "@/constants/Tasks";
import { Task } from "@/entities/Task";

interface AppState {
	is_tasks_synced: boolean;
	tasks: Task[];
	is_loading_tasks: boolean;
	syncTasks: () => void;
	getTasks: () => Task[];
	getTaskOverview: () => {
		total: number;
		completed: number;
		logged: number;
	};
	toggleCardPlayerIcon: (id: number) => void;
	current_task_id: number | null;
	setCurrentTask: (id: number) => void;
	reset: () => void;
}

const initial_state = {
	is_loading_tasks: false,
	is_tasks_synced: false,
	tasks: [],
	current_task_id: null,
};

export const useAppStore = create<AppState>()(
	persist(
		(set, get) => ({
			...initial_state,

			syncTasks: () => {
				set({
					is_tasks_synced: true,
					is_loading_tasks: true,
				});
				setTimeout(() => {
					set({ tasks: TASKS, is_loading_tasks: false });
				}, 2000);
			},

			getTasks: () => get().tasks,

			getTaskOverview: () => {
				const tasks = get().tasks;
				const total = tasks.length;
				const completed = tasks.filter(
					(t) => t.status === "completed"
				).length;
				const logged = 0;

				return { total, completed, logged };
			},

			toggleCardPlayerIcon: (id: number) => {
				set((state) => {
					const target = state.tasks.find((t) => t.id === id);
					if (!target || target.status === "completed") {
						return {};
					}

					const is_currently_tracking = target.status === "tracking";

					const updated: Task[] = state.tasks.map((task) => {
						if (task.id === id) {
							return {
								...task,
								status: is_currently_tracking
									? "todo"
									: "tracking",
								media_icon: is_currently_tracking
									? "play"
									: "pause",
							} as Task;
						}
						if (
							!is_currently_tracking &&
							task.status === "tracking"
						) {
							return {
								...task,
								status: "todo",
								media_icon: "play",
							} as Task;
						}
						return task;
					});

					return { tasks: updated };
				});
			},

			setCurrentTask: (id: number) => {
				set({ current_task_id: id });
			},

			reset: () => {
				set(initial_state);
			},
		}),
		{
			name: "app-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				is_tasks_synced: state.is_tasks_synced,
				tasks: state.tasks,
			}),
		}
	)
);
