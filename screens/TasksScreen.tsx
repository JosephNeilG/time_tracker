/*
 * DOCU: Displays and manages tasks
 * Includes task overview, tabbed filters, quick task creation, and playing task
 */

import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import EmptyTaskListText from "@/components/EmptyTaskListText";
import FloatingActionButton from "@/components/FloatingActionButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import MenuBar from "@/components/MenuBar";
import SearchBar from "@/components/SearchBar";
import TaskCard from "@/components/tasks/TaskCard";
import TasksOverviewCard from "@/components/tasks/TasksOverviewCard";
import {
	TaskMenuItems,
	TASKS_MENU_ITEMS,
} from "@/constants/tasks/TasksMenuItems";
import { Task } from "@/entities/Task";
import { getRemainingDays, getSprintLabel } from "@/helpers/dateHelper";
import createQuickTask from "@/helpers/quickTaskHelper";
import { useAppStore } from "@/store/appStore";
import EmptyTaskView from "../components/EmptyTaskView";

/**
 * DOCU: TasksScreen - Shows sprint overview, task stats,
 * and allow filtering, tracking, and creating tasks
 */
const TasksScreen = () => {
	const router = useRouter();
	const sprint_label = getSprintLabel();
	const days_left = getRemainingDays();
	const [selected_tab, setSelectedTab] = useState<TaskMenuItems>("All");

	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const tasks = useAppStore((state) => state.tasks);
	const syncTasks = useAppStore((state) => state.syncTasks);
	const getTaskOverview = useAppStore((state) => state.getTaskOverview);
	const { total, completed, logged } = getTaskOverview();
	const toggleTrack = useAppStore((state) => state.toggleCardPlayerIcon);

	/* Overview items for summary card */
	const overview_items = [
		{ id: 1, title: `${total} tasks`, subtitle: "assigned" },
		{ id: 2, title: completed, subtitle: "completed" },
		{ id: 3, title: `${logged}`, subtitle: "logged" },
	];

	/**
	 * DOCU: Handle pressing a task card
	 * If task is not completed, set as current and navigate to track screen
	 * @param task: The task object whose card was pressed
	 */
	const handleCardOnPress = (task: Task) => {
		if (task.status !== "completed") {
			useAppStore.getState().setCurrentTask(task.id);

			router.navigate("/");
		}
	};

	/**
	 * DOCU: Handle media (play/ pause) press for  task
	 * Togles tracking state and sets the current task if not completed
	 * @param task: The task object whose media icon was pressed
	 */
	const handleOnMediaPress = (task: Task) => {
		if (task.status !== "completed") {
			toggleTrack(task.id);
			useAppStore.getState().setCurrentTask(task.id);
		}
	};

	/**
	 * DOCU: Handle floating action button press
	 * Create a quick task, updates store, starts timer, and navigates to track screen
	 */
	const handleFABOnPress = () => {
		const quickTask = createQuickTask();

		useAppStore.setState((state) => {
			const updated_tasks = state.tasks.map((task: any) =>
				task.status === "tracking"
					? { ...task, status: "todo", media_icon: "play" }
					: task
			);

			return {
				tasks: [...updated_tasks, quickTask],
				current_task_id: quickTask.id,
			};
		});

		useAppStore.getState().startTimer(quickTask.id);

		router.navigate("/");
	};

	/**
	 * DOCU: Handle tab press from MenuBar
	 * Updates selected tab used for filtering tasks
	 * @param index: Index of the pressed tab in the MenuBar
	 */
	const handleTabPress = (index: number) => {
		setSelectedTab(TASKS_MENU_ITEMS[index].label as TaskMenuItems);
	};

	/** DOCU: Filter tasks based on selected tab (All, In Progress, Completed) */
	const filtered_tasks = useMemo(() => {
		switch (selected_tab) {
			case "All":
				return tasks;
			case "In Progress":
				return tasks.filter(
					(t) => t.status === "tracking" || t.status === "todo"
				);
			case "Completed":
				return tasks.filter((t) => t.status === "completed");
			default:
				return tasks;
		}
	}, [tasks, selected_tab]);

	const is_task_list_empty = filtered_tasks.length === 0;

	return (
		<View className="flex-1">
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="p-7 items-center w-full mb-[70px]">
					{is_tasks_synced ? (
						<>
							<TasksOverviewCard
								sprint_label={sprint_label}
								days_left={days_left}
								overview_items={overview_items}
								progress={0.56}
							/>

							<SearchBar container_style={{ marginBottom: 0 }} />

							<MenuBar
								tabs={TASKS_MENU_ITEMS}
								initial_index={0}
								onTabPress={handleTabPress}
							/>

							{is_loading_tasks ? (
								<LoadingIndicator />
							) : is_task_list_empty ? (
								<EmptyTaskListText list_name={selected_tab} />
							) : (
								filtered_tasks.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										onPress={handleCardOnPress}
										onMediaPress={handleOnMediaPress}
									/>
								))
							)}
						</>
					) : (
						<EmptyTaskView onSync={syncTasks} />
					)}
				</View>
			</ScrollView>

			{is_tasks_synced && (
				<FloatingActionButton onPress={handleFABOnPress} />
			)}
		</View>
	);
};

export default TasksScreen;
