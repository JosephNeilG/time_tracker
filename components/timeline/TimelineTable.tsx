import React, { useState } from "react";
import Timetable from "react-native-calendar-timetable";

import { COLORS } from "@/constants/Colors";
import { TIMELINE_TASKS } from "@/constants/TimelineTasks";
import TimelineCard from "./TimelineCard";

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

export default TimelineTable;
