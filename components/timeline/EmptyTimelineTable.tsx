import { COLORS } from "@/constants/Colors";
import React from "react";
import { Text } from "react-native";
import Card from "../card/Card";

const EmptyTimelineTable = () => {
	return (
		<Card
			border_color="transparent"
			background_color={COLORS.light400}
			style={{ alignItems: "center" }}>
			<Text className="font-medium text-lg text-dark-500">
				No tasks yet
			</Text>
			<Text className="text-dark-100">
				Ongoing and completed tasks appear here.
			</Text>
		</Card>
	);
};

export default EmptyTimelineTable;
