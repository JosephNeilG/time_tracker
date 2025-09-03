import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import EmptyTaskListText from "@/components/EmptyTaskListText";
import FloatingActionButton from "@/components/FloatingActionButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import MenuBar from "@/components/MenuBar";
import TaskCard from "@/components/tasks/TaskCard";
import TasksOverviewCard from "@/components/tasks/TasksOverviewCard";
import { TASKS_MENU_ITEMS } from "@/constants/tasks/TasksMenuItems";
import { Task } from "@/entities/Task";
import { getRemainingDays, getSprintLabel } from "@/helpers/dateHelper";
import createQuickTask from "@/helpers/quickTaskHelper";
import { useAppStore } from "@/store/appStore";
import EmptyTaskView from "../components/EmptyTaskView";

const TasksScreen = () => {
	const router = useRouter();
	const sprint_label = getSprintLabel();
	const days_left = getRemainingDays();
	const [selected_tab, setSelectedTab] = useState<
		"All" | "In Progress" | "Completed"
	>("All");

	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const tasks = useAppStore((state) => state.tasks);
	const syncTasks = useAppStore((state) => state.syncTasks);
	const getTaskOverview = useAppStore((state) => state.getTaskOverview);
	const { total, completed, logged } = getTaskOverview();
	const toggleTrack = useAppStore((state) => state.toggleCardPlayerIcon);

	const overview_items = [
		{ id: 1, title: `${total} tasks`, subtitle: "assigned" },
		{ id: 2, title: completed, subtitle: "completed" },
		{ id: 3, title: `${logged}h`, subtitle: "logged" },
	];

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

		router.navigate("/");
	};

	const handleCardOnPress = (task: Task) => {
		if (task.status !== "completed") {
			useAppStore.getState().setCurrentTask(task.id);

			router.navigate("/");
		}
	};

	const handleOnMediaPress = (task: Task) => {
		if (task.status !== "completed") {
			toggleTrack(task.id);
			useAppStore.getState().setCurrentTask(task.id);
		}
	};

	const filtered_tasks = useMemo(() => {
		switch (selected_tab) {
			case "All":
				return tasks;
			case "In Progress":
				return tasks.filter((t) => t.status === "tracking");
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
				<View className="p-7 items-center w-full">
					{is_tasks_synced ? (
						<>
							<TasksOverviewCard
								sprint_label={sprint_label}
								days_left={days_left}
								overview_items={overview_items}
								progress={0.56}
							/>

							<MenuBar
								tabs={TASKS_MENU_ITEMS}
								initial_index={0}
								onTabPress={(index) => {
									setSelectedTab(
										TASKS_MENU_ITEMS[index].label as
											| "All"
											| "In Progress"
											| "Completed"
									);
								}}
							/>

							{is_loading_tasks ? (
								<LoadingIndicator />
							) : is_task_list_empty ? (
								<EmptyTaskListText
									selected_tab={selected_tab}
								/>
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
