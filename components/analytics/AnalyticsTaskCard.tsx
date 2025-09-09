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
	percent: number;
}

const AnalyticsTaskCard = ({ task_id, percent }: AnalyticsTaskCardProps) => {
	const task = useAppStore((state) =>
		state.tasks.find((task) => task.id === task_id)
	);

	const formatted_time = useMemo(() => {
		if (!task) return "0m";

		if (task.status === "completed") {
			return task.time_logged;
		}

		return formatSecondsToHoursMinutes(task.time_elapsed || 0);
	}, [task?.time_elapsed, task?.status]);

	return (
		<Card>
			<View className="flex-row justify-between items-center">
				<View className="flex-row items-center gap-3">
					<DotSeparator
						size={12}
						color={task?.dot_color || COLORS.dark500}
					/>
					<OverviewItem
						title={task?.title || ""}
						subtitle={task?.category || ""}
						title_size={16}
						title_color={COLORS.dark500}
					/>
				</View>
				<OverviewItem
					title={formatted_time}
					subtitle={`${percent}%`}
					title_size={16}
					title_color={COLORS.dark500}
					align="right"
				/>
			</View>
		</Card>
	);
};

export default AnalyticsTaskCard;
