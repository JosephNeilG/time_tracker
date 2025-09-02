import React from "react";
import { Text } from "react-native";

interface EmptyTaskListTextProps {
	selected_tab: string;
}

const EmptyTaskListText = ({ selected_tab }: EmptyTaskListTextProps) => {
	return (
		<Text className="text-gray-500 text-lg">
			No tasks found in {selected_tab}.
		</Text>
	);
};

export default EmptyTaskListText;
