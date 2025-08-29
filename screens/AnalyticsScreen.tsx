import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Card from "@/components/card/Card";
import DotSeparator from "@/components/DotSeparator";
import MenuBar from "@/components/MenuBar";
import TaskOverviewItem from "@/components/TaskOverviewItem";
import TimelineTable from "@/components/TimelineTable";
import { ANALYTICS_MENU_ITEMS } from "@/constants/AnalyticsMenuItems";
import { ANALYTICS_TASKS } from "@/constants/AnalyticsTasks";
import { COLORS } from "@/constants/Colors";

const AnalyticsScreen = () => {
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
					<View className="flex-row justify-between items-center px-3">
						<TaskOverviewItem
							title="7h 42m"
							subtitle="Total Tracked"
							title_size={26}
							title_color={COLORS.primary}
							align="center"
						/>
						<TaskOverviewItem
							title="4"
							subtitle="Tasks Worked"
							title_size={26}
							title_color={COLORS.primary}
							align="center"
						/>
						<TaskOverviewItem
							title="96%"
							subtitle="Efficiency"
							title_size={26}
							title_color={COLORS.primary}
							align="center"
						/>
					</View>
				</Card>

				<MenuBar tabs={ANALYTICS_MENU_ITEMS} initial_index={1} />

				<TimelineTable />

				<Text className="text-primary text-2xl font-medium my-4">
					Task Breakdown
				</Text>

				{ANALYTICS_TASKS.map((task, index) => (
					<Card key={index}>
						<View className="flex-row justify-between items-center">
							<View className="flex-row items-center gap-3">
								<DotSeparator size={12} color={task.dotColor} />
								<TaskOverviewItem
									title={task.title}
									subtitle={task.subtitle}
									title_size={16}
									title_color={COLORS.primary}
								/>
							</View>
							<TaskOverviewItem
								title={task.time}
								subtitle={task.percent}
								title_size={16}
								title_color={COLORS.primary}
								align="right"
							/>
						</View>
					</Card>
				))}
			</View>
		</ScrollView>
	);
};

export default AnalyticsScreen;
