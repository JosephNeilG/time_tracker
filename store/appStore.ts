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
