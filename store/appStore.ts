import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TASKS } from "@/constants/Tasks";
import { Task } from "@/entities/Task";

interface AppState {
	is_tasks_synced: boolean;
	tasks: Task[];
	is_loading_tasks: boolean; // new loading for task list
	syncTasks: () => void;
	getTasks: () => Task[];
	reset: () => void;
}

const initialState = {
	is_loading_tasks: false,
	is_tasks_synced: false,
	tasks: [],
};

export const useAppStore = create<AppState>()(
	persist(
		(set, get) => ({
			...initialState,

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

			reset: () => {
				set(initialState);
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
