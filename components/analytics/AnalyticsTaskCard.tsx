import { COLORS } from "@/constants/Colors";
import { formatSecondsToHoursMinutes } from "@/helpers/timeHelper";
import { useAppStore } from "@/store/appStore";
import React, { useMemo } from "react";
import { View } from "react-native";
import Card from "../card/Card";
import DotSeparator from "../DotSeparator";
import OverviewItem from "../OverviewItem";

interface AnalyticsTaskCardProps {
	task_id: number;
}

const AnalyticsTaskCard = ({ task_id }: AnalyticsTaskCardProps) => {
	const task = useAppStore((state) =>
		state.tasks.find((t) => t.id === task_id)
	);

	const formatted_time = useMemo(() => {
		if (task) {
			return formatSecondsToHoursMinutes(task.time_elapsed || 0);
		} else {
			return "0m";
		}
	}, [task?.time_elapsed]);

	const progress_percent =
		task?.status === "completed" ? "100%" : task?.progress_percent;

	return (
		<Card>
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center gap-3">
					<DotSeparator
						size={12}
						color={task?.dot_color || COLORS.primary}
					/>
					<OverviewItem
						title={task?.title || ""}
						subtitle={task?.category || ""}
						title_size={16}
						title_color={COLORS.primary}
					/>
				</View>
				<OverviewItem
					title={formatted_time}
					subtitle={progress_percent || ""}
					title_size={16}
					title_color={COLORS.primary}
					align="right"
				/>
			</View>
		</Card>
	);
};

export default AnalyticsTaskCard;
