import { COLORS } from "@/constants/Colors";
import { TimelineTask } from "@/entities/TimelineTask";
import moment from "moment";
import React from "react";
import { Text, View, ViewStyle } from "react-native";

interface TimelineCardProps {
	style?: ViewStyle;
	item: TimelineTask;
}

const TimelineCard = ({ style, item }: TimelineCardProps) => {
	const duration_minutes = moment(item.endDate).diff(
		moment(item.startDate),
		"minutes"
	);
	const hours = Math.floor(duration_minutes / 60);
	const minutes = duration_minutes % 60;
	const duration_string =
		hours > 0
			? `${hours}h ${minutes > 0 ? minutes + "m" : ""}`
			: `${minutes}m`;

	const is_break = item.type === "break";

	return (
		<View
			className="rounded-lg p-3"
			style={{
				...style,
				backgroundColor: is_break ? "#E6E7EB" : item.color,
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
						{moment(item.startDate).format("h:mm")} -{" "}
						{moment(item.endDate).format("h:mm")}
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
