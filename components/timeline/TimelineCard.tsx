import { COLORS } from "@/constants/Colors";
import { TimelineItem } from "@/entities/TimelineInterface";
import moment from "moment";
import React from "react";
import { Text, View, ViewStyle } from "react-native";

interface TimelineCardProps {
	style?: ViewStyle;
	item: TimelineItem;
}

const TimelineCard = ({ style, item }: TimelineCardProps) => {
	const durationMinutes = moment(item.endDate).diff(
		moment(item.startDate),
		"minutes"
	);
	const hours = Math.floor(durationMinutes / 60);
	const minutes = durationMinutes % 60;
	const durationString =
		hours > 0
			? `${hours}h ${minutes > 0 ? minutes + "m" : ""}`
			: `${minutes}m`;

	const isBreak = item.type === "break";

	return (
		<View
			className="rounded-lg p-3"
			style={{
				...style,
				backgroundColor: isBreak ? "#E6E7EB" : item.color,
				borderWidth: isBreak ? 2 : 0,
				borderStyle: isBreak ? "dashed" : "solid",
				borderColor: isBreak ? "gray" : "transparent",
			}}>
			<Text
				className="font-medium"
				style={{
					color: isBreak ? COLORS.dark100 : COLORS.white,
				}}>
				{isBreak ? `Break (${durationString})` : item.title}
			</Text>

			{!isBreak && (
				<>
					<Text className="text-light-100 font-medium">
						{moment(item.startDate).format("h:mm")} -{" "}
						{moment(item.endDate).format("h:mm")}
					</Text>

					<Text className="text-light-200 font-medium">
						{durationString}
					</Text>
				</>
			)}
		</View>
	);
};

export default TimelineCard;
