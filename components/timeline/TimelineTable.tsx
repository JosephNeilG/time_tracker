import React, { useState } from "react";
import Timetable from "react-native-calendar-timetable";

import { TimelineTask } from "@/entities/TimelineTask";
import { StyleSheet } from "react-native";
import EmptyTimelineTable from "./EmptyTimelineTable";
import TimelineCard from "./TimelineCard";

interface TimelineTableProps {
	timeline_tasks: TimelineTask[];
}

const TimelineTable = ({ timeline_tasks }: TimelineTableProps) => {
	const [date] = useState(new Date());

	if (timeline_tasks.length === 0) {
		return <EmptyTimelineTable />;
	}

	return (
		<Timetable
			items={timeline_tasks}
			renderItem={({ key, ...props }) => (
				<TimelineCard key={key} {...props} />
			)}
			date={date}
			fromHour={8}
			toHour={18}
			is12Hour
		/>
	);
};

const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	emptyText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#555",
		marginBottom: 4,
	},
	emptySubText: {
		fontSize: 14,
		color: "#888",
	},
});

export default TimelineTable;
