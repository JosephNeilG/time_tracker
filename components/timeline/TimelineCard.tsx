import moment from "moment";
import React from "react";
import { Text, View, ViewStyle } from "react-native";

import { COLORS } from "@/constants/Colors";
import { TimelineTask } from "@/entities/TimelineTask";
import {
	formatSecondsToHoursMinutes,
	formatTimeRange,
} from "@/helpers/timeHelper";

interface TimelineCardProps {
	style?: ViewStyle;
	item: TimelineTask;
}

const TimelineCard = ({ style, item }: TimelineCardProps) => {
	const duration_seconds = moment(item.endDate).diff(
		moment(item.startDate),
		"seconds"
	);

	const duration_string = formatSecondsToHoursMinutes(duration_seconds);

	const is_break = item.type === "break";

	return (
		<View
			className="rounded-lg p-1"
			style={{
				...style,
				backgroundColor: is_break ? COLORS.dark300 : item.color,
				borderWidth: is_break ? 2 : 0,
				borderStyle: is_break ? "dashed" : "solid",
				borderColor: is_break ? "gray" : "transparent",
			}}>
			<Text
				className="font-medium"
				style={{
					color: is_break ? COLORS.dark100 : COLORS.white,
				}}>
				{is_break ? `Break (${duration_string})` : item.title}
			</Text>

			{!is_break && (
				<>
					<Text className="text-light-100 font-medium">
						{formatTimeRange(item.startDate, item.endDate)}
					</Text>

					<Text className="text-light-200 font-medium">
						{duration_string}
					</Text>
				</>
			)}
		</View>
	);
};

export default TimelineCard;
