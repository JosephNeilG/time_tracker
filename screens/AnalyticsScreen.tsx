import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import AnalyticsOverviewCard from "@/components/analytics/AnalyticsOverviewCard";
import AnalyticsTaskCard from "@/components/analytics/AnalyticsTaskCard";
import EmptyTaskView from "@/components/EmptyTaskView";
import LoadingIndicator from "@/components/LoadingIndicator";
import MenuBar from "@/components/MenuBar";
import TimelineTable from "@/components/timeline/TimelineTable";
import { ANALYTICS_MENU_ITEMS } from "@/constants/analytics/AnalyticsMenuItems";
import { COLORS } from "@/constants/Colors";
import { getCurrentMonthDateYear } from "@/helpers/dateHelper";
import { useAppStore } from "@/store/appStore";

const AnalyticsScreen = () => {
	const getAnalyticsOverview = useAppStore(
		(state) => state.getAnalyticsOverview
	);
	const { total_tracked_time, tasks_worked_count, efficiency } =
		getAnalyticsOverview();

	const overview_items = [
		{ id: 1, title: `${total_tracked_time} `, subtitle: "Total Tracked" },
		{ id: 2, title: tasks_worked_count, subtitle: "completed" },
		{ id: 3, title: `${efficiency}%`, subtitle: "Efficiency" },
	];

	const current_date = getCurrentMonthDateYear();

	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const tasks = useAppStore((state) => state.tasks);
	const syncTasks = useAppStore((state) => state.syncTasks);

	const analytics_tasks = tasks.map((task) => ({
		id: task.id,
		task_title: task.title,
		task_category_name: task.category,
		task_time_logged: task.time_logged,
		task_progress_percent: task.progress_percent,
		dot_color: task.dot_color,
	}));
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className="p-7 items-center w-full">
				{is_tasks_synced ? (
					<>
						<View className="flex-row justify-between items-center w-full mb-6">
							<Text className="text-primary text-2xl font-medium">
								Today's Tracking
							</Text>
							<View className="flex-row gap-6">
								<TouchableOpacity className="flex-row items-center gap-2">
									<FontAwesome6
										name="chevron-left"
										size={16}
										color={COLORS.dark100}
									/>
								</TouchableOpacity>

								<Text className="text-dark-100 text-lg font-medium leading-6">
									{current_date}
								</Text>

								<TouchableOpacity className="flex-row items-center gap-2">
									<FontAwesome6
										name="chevron-right"
										size={16}
										color={COLORS.dark100}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<AnalyticsOverviewCard
							overview_items={overview_items}
						/>

						<MenuBar
							tabs={ANALYTICS_MENU_ITEMS}
							initial_index={1}
						/>

						<TimelineTable />

						<View className="w-full items-start my-4">
							<Text className="text-primary text-2xl font-medium">
								Task Breakdown
							</Text>
						</View>

						{is_loading_tasks ? (
							<LoadingIndicator />
						) : (
							analytics_tasks.map((task) => (
								<AnalyticsTaskCard
									key={task.id}
									task_id={task.id}
								/>
							))
						)}
					</>
				) : (
					<EmptyTaskView onSync={syncTasks} />
				)}
			</View>
		</ScrollView>
	);
};

export default AnalyticsScreen;
