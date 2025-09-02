import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import EmptyTaskListText from "@/components/EmptyTaskListText";
import FloatingActionButton from "@/components/FloatingActionButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import MenuBar from "@/components/MenuBar";
import TaskCard from "@/components/tasks/TaskCard";
import TasksOverviewCard from "@/components/tasks/TasksOverviewCard";
import { QUICK_TASK_DETAILS } from "@/constants/tasks/QuickTaskDetails";
import { TASKS_MENU_ITEMS } from "@/constants/tasks/TasksMenuItems";
import { getRemainingDays, getSprintLabel } from "@/helpers/dateHelper";
import { useAppStore } from "@/store/appStore";
import EmptyTaskView from "../components/EmptyTaskView";

const TasksScreen = () => {
	const router = useRouter();
	const [selected_tab, setSelectedTab] = useState<
		"All" | "In Progress" | "Completed"
	>("All");

	const sprint_label = getSprintLabel();
	const days_left = getRemainingDays();

	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const syncTasks = useAppStore((state) => state.syncTasks);

	const getTasksByMenu = useAppStore((state) => state.getTasksByMenu);
	const filtered_tasks = getTasksByMenu(selected_tab);

	const getTaskOverview = useAppStore((state) => state.getTaskOverview);
	const { total, completed, logged } = getTaskOverview();

	const overview_items = [
		{ id: 1, title: `${total} tasks`, subtitle: "assigned" },
		{ id: 2, title: completed, subtitle: "completed" },
		{ id: 3, title: logged, subtitle: "logged" },
	];

	const is_task_list_empty = filtered_tasks.length === 0;

	const handleFABOnPress = () => {
		router.navigate({
			pathname: "/",
			params: QUICK_TASK_DETAILS,
		});
	};

	const handleCardOnPress = () => {
		router.navigate("/");
	};

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
