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
	getTasksByMenu: (menu_label: "All" | "In Progress" | "Completed") => Task[];
	getTaskOverview: () => {
		total: number;
		completed: number;
		logged: string | number;
	};
	reset: () => void;
}

const initial_state = {
	is_loading_tasks: false,
	is_tasks_synced: false,
	tasks: [],
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

			getTasksByMenu: (
				menuLabel: "All" | "In Progress" | "Completed"
			) => {
				const tasks = get().tasks;
				switch (menuLabel) {
					case "All":
						return tasks;
					case "In Progress":
						return tasks.filter((t) => t.status === "tracking");
					case "Completed":
						return tasks.filter((t) => t.status === "completed");
					default:
						return tasks;
				}
			},

			getTaskOverview: () => {
				const tasks = get().tasks;
				const total = tasks.length;
				const completed = tasks.filter(
					(t) => t.status === "completed"
				).length;
				const logged_static_value = 0;
				const logged = `${logged_static_value}h`;

				return { total, completed, logged };
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
