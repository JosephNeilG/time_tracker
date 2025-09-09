import React from "react";
import { Text } from "react-native";

interface EmptyTaskListTextProps {
	list_name: string;
}

const EmptyTaskListText = ({ list_name }: EmptyTaskListTextProps) => {
	return (
		<Text className="text-gray-500 text-lg">
			No tasks found in {list_name}.
		</Text>
	);
};

export default EmptyTaskListText;
