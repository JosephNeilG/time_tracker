import { COLORS } from "@/constants/Colors";
import { AnalyticsTask } from "@/entities/AnalyticsTask";
import React from "react";
import { View } from "react-native";
import Card from "../card/Card";
import DotSeparator from "../DotSeparator";
import OverviewItem from "../OverviewItem";

interface AnalyticsTaskCardProps {
	task: AnalyticsTask;
}

const AnalyticsTaskCard = ({ task }: AnalyticsTaskCardProps) => {
	return (
		<Card>
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center gap-3">
					<DotSeparator size={12} color={task.dot_color} />
					<OverviewItem
						title={task.title}
						subtitle={task.subtitle}
						title_size={16}
						title_color={COLORS.primary}
					/>
				</View>
				<OverviewItem
					title={task.time}
					subtitle={task.progress_percent}
					title_size={16}
					title_color={COLORS.primary}
					align="right"
				/>
			</View>
		</Card>
	);
};

export default AnalyticsTaskCard;
