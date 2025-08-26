import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface TaskOverviewItemProps {
	value: string | number;
	label: string;
	style?: StyleProp<ViewStyle>;
}

const TaskOverviewItem = ({ value, label, style }: TaskOverviewItemProps) => {
	return (
		<View className="flex-1" style={style}>
			<Text className="text-dark-100 text-base font-medium">{value}</Text>
			<Text className="text-dark-100 text-base font-medium">{label}</Text>
		</View>
	);
};

export default TaskOverviewItem;
