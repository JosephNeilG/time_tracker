import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TASKS } from "@/constants/Tasks";
import { Task } from "@/entities/Task";
import {
	formatSecondsToHoursMinutes,
	formatSecondstoMinutes,
	formatTime,
} from "@/helpers/timeHelper";

interface AppState {
	is_tasks_synced: boolean;
	tasks: Task[];
	is_loading_tasks: boolean;
	current_task_id: number | null;
	quick_task_counter: number;
	timer_interval_id: number | null;

	syncTasks: () => void;
	getTotalElapsedSeconds: () => number;
	getTaskOverview: () => {
		total: number;
		completed: number;
		logged: string;
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

/**
 * DOCU: useAppStore - Zustand store for task and timer state management
 * Includes persistence with AsyncStorage for offline support
 * Last Updated At: September 5 2025
 */
export const useAppStore = create<AppState>()(
	persist(
		(set, get) => ({
			...initial_state,

			/**
			 * DOCU: Sync tasks with local constants
			 * Simulate an async fetch before setting tasks
			 */
			syncTasks: () => {
				set({
					is_tasks_synced: true,
					is_loading_tasks: true,
				});
				setTimeout(() => {
					set({ tasks: TASKS, is_loading_tasks: false });
				}, 1000);
			},

			/**
			 * DOCU: Calculate total elapsed seonds from all tasks
			 * @returns Number with sum of elapsed seconds
			 */
			getTotalElapsedSeconds: () => {
				const tasks = get().tasks;
				return tasks.reduce(
					(acc, task) => acc + (task.time_elapsed || 0),
					0
				);
			},

			/**
			 * DOCU: Get task overview summary
			 * @returns Object with total tasks, completed tasks, logged time
			 */
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

				const logged = formatSecondstoMinutes(logged_seconds);

				return { total, completed, logged };
			},

			/**
			 * Get analytics overview summary
			 * @returns Object with total tracked time, completed tasks count, efficiency percentage
			 */
			getAnalyticsOverview: () => {
				const tasks = get().tasks;

				const total_seconds = tasks.reduce(
					(acc, task) => acc + (task.time_elapsed || 0),
					0
				);

				const total_tracked_time =
					formatSecondsToHoursMinutes(total_seconds);

				const tasks_worked_count = tasks.filter(
					(task) => task.status === "completed"
				).length;

				const efficiency = 80;

				return {
					total_tracked_time,
					tasks_worked_count,
					efficiency,
				};
			},

			/**
			 * DOCU: Set the currently active task
			 * @param id: ID of the task to set
			 */
			setCurrentTask: (id: number) => {
				set({ current_task_id: id });
			},

			/**
			 * DOCU: Increment quick task title's counter
			 */
			incrementQuickTaskCounter: () =>
				set((state) => ({
					quick_task_counter: state.quick_task_counter + 1,
				})),

			/**
			 * DOCU: Stop the task timer
			 * Clears interval and resets timer state
			 */
			stopTimer: () => {
				const { timer_interval_id } = get();
				if (timer_interval_id) {
					clearInterval(timer_interval_id);
					set({ timer_interval_id: null });
				}
			},

			/**
			 * DOCU: Start a timer for a specific task
			 * Updates task time_elapsed every second
			 * @param id: Task ID to start timer for
			 */
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

			/**
			 * DOCU: Toggle play/pause state of task card
			 * @param id: Task ID to toggle
			 */
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
						get().startTimer(id);
					}

					return { tasks: updated_tasks };
				});
			},

			/**
			 * DOCU: Reset store to initial state
			 */
			reset: () => {
				set(initial_state);
			},
		}),
		{
			name: "app-storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				is_tasks_synced: state.is_tasks_synced,
				current_task_id: state.current_task_id,
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
			}),
		}
	)
);
