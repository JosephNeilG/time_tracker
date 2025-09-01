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
import MenuBar from "@/components/MenuBar";
import OverviewItem from "@/components/OverviewItem";
import TimelineTable from "@/components/timeline/TimelineTable";
import { ANALYTICS_MENU_ITEMS } from "@/constants/analytics/AnalyticsMenuItems";
import { COLORS } from "@/constants/Colors";
import useAnalyticsOverviewItems from "@/hooks/useAnalyticsOverviewItems";
import useAnalyticsTasks from "@/hooks/useAnalyticsTasks";

const AnalyticsScreen = () => {
	const { data: analytics_tasks, is_loading, error } = useAnalyticsTasks();
	const {
		data: overview_items,
		is_loading: overview_is_loading,
		error: overview_error,
	} = useAnalyticsOverviewItems();
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className=" flex-1 p-7">
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
					{overview_is_loading && <ActivityIndicator size="small" />}
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

				<MenuBar tabs={ANALYTICS_MENU_ITEMS} initial_index={1} />

				<TimelineTable />

				<Text className="text-primary text-2xl font-medium my-4">
					Task Breakdown
				</Text>

				{is_loading && <ActivityIndicator size="large" />}

				{error && (
					<Text className="text-red-800">Error: {error.message}</Text>
				)}

				{analytics_tasks?.map((task) => (
					<AnalyticsTaskCard task={task} key={task.id} />
				))}
			</View>
		</ScrollView>
	);
};

export default AnalyticsScreen;
