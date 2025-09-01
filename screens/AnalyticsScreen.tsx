import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import AnalyticsTaskCard from "@/components/analytics/AnalyticsTaskCard";
import Card from "@/components/card/Card";
import EmptyTaskView from "@/components/EmptyTaskView";
import MenuBar from "@/components/MenuBar";
import OverviewItem from "@/components/OverviewItem";
import TimelineTable from "@/components/timeline/TimelineTable";
import { ANALYTICS_MENU_ITEMS } from "@/constants/analytics/AnalyticsMenuItems";
import { COLORS } from "@/constants/Colors";
import useAnalyticsOverviewItems from "@/hooks/useAnalyticsOverviewItems";
import { useAppStore } from "@/store/appStore";

const AnalyticsScreen = () => {
	const {
		data: overview_items,
		is_loading: overview_is_loading,
		error: overview_error,
	} = useAnalyticsOverviewItems();

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
									Jan 15, 2025
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

						<Card
							border_color="transparent"
							background_color={COLORS.light400}>
							{overview_is_loading && (
								<ActivityIndicator size="small" />
							)}
							{overview_error && (
								<Text className="text-red-800">
									Error: {overview_error.message}
								</Text>
							)}
							<View className="flex-row justify-between items-center px-3">
								{overview_items?.map((item) => (
									<OverviewItem
										key={item.id}
										title={item.title}
										subtitle={item.subtitle}
										title_size={item.title_size}
										title_color={COLORS.primary}
										align="center"
									/>
								))}
							</View>
						</Card>

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
							<ActivityIndicator size="large" />
						) : (
							analytics_tasks.map((task) => (
								<AnalyticsTaskCard key={task.id} task={task} />
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
