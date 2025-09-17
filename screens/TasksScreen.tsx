/*
 * DOCU: Displays and manages tasks
 * Includes task overview, tabbed filters, quick task creation, and playing task
 */

import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import EmptyTaskListText from "@/components/EmptyTaskListText";
import MenuBar from "@/components/MenuBar";
import SearchBar from "@/components/SearchBar";
import TaskCardSkeleton from "@/components/skeletons/TaskCardSkeleton";
import TaskCard from "@/components/tasks/TaskCard";
import TasksFabGroup from "@/components/tasks/TasksFabGroup";
import TasksOverviewCard from "@/components/tasks/TasksOverviewCard";
import TaskConfirmationBottomSheet from "@/components/track/TasksConfirmationBottomSheet";
import { SKELETONS } from "@/constants/Skeletons";
import {
	TaskMenuItems,
	TASKS_MENU_ITEMS,
} from "@/constants/tasks/TasksMenuItems";
import {
	PendingAction,
	PendingActionType,
} from "@/entities/PendingActionTypes";
import { Task } from "@/entities/Task";
import { getRemainingDays, getSprintLabel } from "@/helpers/dateHelper";
import { useAppStore } from "@/store/appStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
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
	const [search_query, setSearchQuery] = useState<string>("");
	const [pending_action, setPendingAction] = useState<PendingAction | null>(
		null
	);
	const bottom_sheet_ref = useRef<BottomSheetModal>(null);

	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const tasks = useAppStore((state) => state.tasks);
	const syncTasks = useAppStore((state) => state.syncTasks);
	const getTaskOverview = useAppStore((state) => state.getTaskOverview);
	const { total, completed, logged } = getTaskOverview();
	const toggleTrack = useAppStore((state) => state.toggleCardPlayerIcon);

	/** Calculate progress dynamically for progress bar */
	const progress = total === 0 ? 0 : completed / total;

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
	 * DOCU: Handle tab press from MenuBar
	 * Updates selected tab used for filtering tasks
	 * @param index: Index of the pressed tab in the MenuBar
	 */
	const handleTabPress = (index: number) => {
		setSelectedTab(TASKS_MENU_ITEMS[index].label as TaskMenuItems);
	};

	/** DOCU: Filter tasks based on selected tab (All, In Progress, Completed) and search query */
	const filtered_tasks = useMemo(() => {
		let filtered = tasks;

		switch (selected_tab) {
			case "In Progress":
				filtered = filtered.filter(
					(task) =>
						task.status === "tracking" || task.status === "todo"
				);
				break;
			case "Completed":
				filtered = filtered.filter(
					(task) => task.status === "completed"
				);
				break;
			default:
				break;
		}

		if (search_query.trim() !== "") {
			filtered = filtered.filter((task) =>
				task.title.toLowerCase().includes(search_query.toLowerCase())
			);
		}

		return filtered;
	}, [tasks, selected_tab, search_query]);

	const handleSwipeRequest = (action: PendingActionType, task_id: number) => {
		const swiped_task = tasks.find((task) => task.id === task_id);

		setPendingAction({
			type: action,
			task_id,
			task_title: swiped_task?.title ?? "this task",
		});
		bottom_sheet_ref.current?.present();
	};

	const is_task_list_empty = filtered_tasks.length === 0;

	return (
		<View className="flex-1">
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="p-7 items-center w-full mb-[130px]">
					{is_tasks_synced ? (
						<>
							<TasksOverviewCard
								sprint_label={sprint_label}
								days_left={days_left}
								overview_items={overview_items}
								progress={progress}
							/>

							<SearchBar
								container_style={{ marginBottom: 0 }}
								value={search_query}
								onChangeText={setSearchQuery}
							/>

							<MenuBar
								tabs={TASKS_MENU_ITEMS}
								initial_index={0}
								onTabPress={handleTabPress}
							/>

							{is_loading_tasks ? (
								SKELETONS.map((index) => (
									<TaskCardSkeleton key={index} />
								))
							) : is_task_list_empty ? (
								<EmptyTaskListText list_name={selected_tab} />
							) : (
								filtered_tasks.map((task) => (
									<TaskCard
										key={task.id}
										task={task}
										onPress={handleCardOnPress}
										onMediaPress={handleOnMediaPress}
										onSwipeRequest={handleSwipeRequest}
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
				<>
					<TasksFabGroup />

					<TaskConfirmationBottomSheet
						ref={bottom_sheet_ref}
						pending_action={pending_action}
						setPendingAction={setPendingAction}
					/>
				</>
			)}
		</View>
	);
};

export default TasksScreen;
