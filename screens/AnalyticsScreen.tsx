/*
 * DOCU: Displays task analytics incuding tracked time, completed count,
 * efficiency, and task breakdown with time elapsed and percentage time contributions.
 * Last Updated At: September 5 2025
 */

import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

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

/**
 * DOCU: AnalyticsScreen - Provides overview of user's task analytics
 * Shows tracked time, efficiency, and breakdown of tasks
 * Supports pull to refresh to recalculate percentages
 */
const AnalyticsScreen = () => {
	const getAnalyticsOverview = useAppStore(
		(state) => state.getAnalyticsOverview
	);
	const { total_tracked_time, tasks_worked_count, efficiency } =
		getAnalyticsOverview();

	const current_date = getCurrentMonthDateYear();
	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const tasks = useAppStore((state) => state.tasks);
	const syncTasks = useAppStore((state) => state.syncTasks);

	const [percentages, setPercentages] = useState<Record<number, number>>({});
	const [refreshing, setRefreshing] = useState(false);

	/* Overview summary items */
	const overview_items = [
		{ id: 1, title: `${total_tracked_time} `, subtitle: "Total Tracked" },
		{ id: 2, title: tasks_worked_count, subtitle: "completed" },
		{ id: 3, title: `${efficiency}%`, subtitle: "Efficiency" },
	];

	/* Prepare analytics data for rendering */
	const analytics_tasks = tasks.map((task) => ({
		id: task.id,
		task_title: task.title,
		task_category_name: task.category,
		task_time_logged: task.time_logged,
		task_progress_percent: task.progress_percent,
		dot_color: task.dot_color,
	}));

	/**
	 * DOCU: Computes the percentage contribution of each task
	 * relative to the total elapsed tracked time
	 */
	const calculatePercentages = useCallback(() => {
		const store = useAppStore.getState();
		const tasks_total_elapsed = store.getTotalElapsedSeconds();

		const task_percentages: Record<number, number> = {};
		store.tasks.forEach((task) => {
			const percent =
				tasks_total_elapsed > 0
					? Math.round(
							((task.time_elapsed || 0) / tasks_total_elapsed) *
								100
						)
					: 0;
			task_percentages[task.id] = percent;
		});

		setPercentages(task_percentages);
	}, []);

	/** DOCU: Handles pull-to-refresh action, recalculates task percentages */
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		calculatePercentages();
		setRefreshing(false);
	}, [calculatePercentages]);

	/** DOCU: Ensures percentages are recalculated whenever screen is focused */
	useFocusEffect(
		useCallback(() => {
			calculatePercentages();
		}, [calculatePercentages])
	);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
			<View className="p-7 items-center w-full mb-[70px]">
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
									percent={percentages[task.id] ?? 0}
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
