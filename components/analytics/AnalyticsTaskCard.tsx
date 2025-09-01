import { COLORS } from "@/constants/Colors";
import { AnalyticsTasks } from "@/entities/AnalyticsTask";
import React from "react";
import { View } from "react-native";
import Card from "../card/Card";
import DotSeparator from "../DotSeparator";
import TaskOverviewItem from "../TaskOverviewItem";

interface AnalyticsTaskCardProps {
	task: AnalyticsTasks;
}

const AnalyticsTaskCard = ({ task }: AnalyticsTaskCardProps) => {
	return (
		<Card>
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
	);
};

export default AnalyticsTaskCard;
