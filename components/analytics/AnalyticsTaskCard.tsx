import React, { useMemo } from "react";
import { View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { formatSecondsToHoursMinutes } from "@/helpers/timeHelper";
import { useAppStore } from "@/store/appStore";
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
		if (!task) return "0m";

		if (task.status === "completed") {
			return task.time_logged;
		}

		return formatSecondsToHoursMinutes(task.time_elapsed || 0);
	}, [task?.time_elapsed]);

	const getTotalElapsedSeconds = useAppStore(
		(state) => state.getTotalElapsedSeconds
	);
	const tasks_total_elapsed = getTotalElapsedSeconds();

	const percent =
		tasks_total_elapsed > 0
			? Math.round(
					((task?.time_elapsed || 0) / tasks_total_elapsed) * 100
				)
			: 0;

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
					subtitle={`${percent}%`}
					title_size={16}
					title_color={COLORS.primary}
					align="right"
				/>
			</View>
		</Card>
	);
};

export default AnalyticsTaskCard;
