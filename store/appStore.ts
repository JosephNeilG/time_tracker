import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TASKS } from "@/constants/Tasks";
import { Task } from "@/entities/Task";
import { formatSecondsToHoursMinutes, formatTime } from "@/helpers/timeHelper";

interface AppState {
	is_tasks_synced: boolean;
	tasks: Task[];
	is_loading_tasks: boolean;
	current_task_id: number | null;
	quick_task_counter: number;
	timer_interval_id: number | null;

	syncTasks: () => void;
	getTasks: () => Task[];
	getTaskOverview: () => {
		total: number;
		completed: number;
		logged: number;
	};
	getAnalyticsOverview: () => {
		total_tracked_time: string;
		tasks_worked_count: number;
		efficiency: number;
	};
	toggleCardPlayerIcon: (id: number) => void;
	setCurrentTask: (id: number) => void;
	incrementQuickTaskCounter: () => void;
	stopTimer: () => void;
	startTimer: (id: number) => void;
	reset: () => void;
}

const initial_state = {
	is_loading_tasks: false,
	is_tasks_synced: false,
	tasks: [],
	current_task_id: null,
	quick_task_counter: 1,
	timer_interval_id: null,
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
				}, 1000);
			},

			getTasks: () => get().tasks,

			getTaskOverview: () => {
				const tasks = get().tasks;
				const total = tasks.length;
				const completed = tasks.filter(
					(task) => task.status === "completed"
				).length;

				const logged_seconds = tasks.reduce(
					(acc, task) => acc + (task.time_elapsed || 0),
					0
				);

				const logged = Math.round(logged_seconds / 60);
				// const logged = Math.round(logged_seconds / 3600);

				return { total, completed, logged };
			},

			getAnalyticsOverview: () => {
				const tasks = get().tasks;

				const total_seconds = tasks.reduce(
					(acc, t) => acc + (t.time_elapsed || 0),
					0
				);

				const total_tracked_time =
					formatSecondsToHoursMinutes(total_seconds);

				const tasks_worked_count = tasks.filter(
					(t) => t.status === "completed"
				).length;

				const efficiency = 80;

				return {
					total_tracked_time,
					tasks_worked_count,
					efficiency,
				};
			},

			setCurrentTask: (id: number) => {
				set({ current_task_id: id });
			},

			incrementQuickTaskCounter: () =>
				set((state) => ({
					quick_task_counter: state.quick_task_counter + 1,
				})),

			stopTimer: () => {
				const { timer_interval_id } = get();
				if (timer_interval_id) {
					clearInterval(timer_interval_id);
					set({ timer_interval_id: null });
				}
			},

			startTimer: (id: number) => {
				get().stopTimer();

				const interval_id = setInterval(() => {
					set((state) => {
						const updated_tasks = state.tasks.map((t) => {
							if (t.id === id && t.status === "tracking") {
								const new_time = (t.time_elapsed || 0) + 1;
								return {
									...t,
									time_elapsed: new_time,
									time_stamp: formatTime(new_time),
								};
							}
							return t;
						});
						return { tasks: updated_tasks };
					});
				}, 1000);

				set({ timer_interval_id: interval_id });
			},

			toggleCardPlayerIcon: (id: number) => {
				set((state) => {
					const target = state.tasks.find((t) => t.id === id);
					if (!target || target.status === "completed") {
						return {};
					}

					const is_currently_tracking = target.status === "tracking";

					const updated_tasks: Task[] = state.tasks.map((task) => {
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

					if (is_currently_tracking) {
						get().stopTimer();
					} else {
						setTimeout(() => get().startTimer(id), 100);
					}

					return { tasks: updated_tasks };
				});
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
				tasks: state.tasks.map((task) => {
					if (task.status === "tracking") {
						return {
							...task,
							status: "todo",
							media_icon: "play",
						};
					}

					return task;
				}),
				timer_interval_id: state.timer_interval_id,
			}),
		}
	)
);
