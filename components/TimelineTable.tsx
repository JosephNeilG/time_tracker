import moment from "moment";
import React, { useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import Timetable from "react-native-calendar-timetable";

import { COLORS } from "@/constants/Colors";
import { TIMELINE_TASKS } from "@/constants/TimelineTasks";

interface TimelineItem {
	title: string;
	startDate: string | Date;
	endDate: string | Date;
	color: string;
	isBreak?: boolean;
	type: "work" | "break";
}

interface TimelineCardProps {
	style?: ViewStyle;
	item: TimelineItem;
}

const TimelineTable = () => {
	const [date] = useState(new Date());

	return (
		<Timetable
			items={TIMELINE_TASKS}
			renderItem={({ key, ...props }) => (
				<TimelineCard key={key} {...props} />
			)}
			date={date}
			fromHour={9}
			toHour={18}
			is12Hour
			style={{
				nowLine: {
					dot: {
						backgroundColor: COLORS.dark400,
					},
					line: {
						backgroundColor: COLORS.dark400,
					},
				},
			}}
		/>
	);
};

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

export default TimelineTable;
