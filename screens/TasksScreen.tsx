import React, { useState } from "react";
import { Text, View } from "react-native";

import NoTask from "./NoTask";

const TasksScreen = () => {
	const [hasTasks, setHasTasks] = useState(false);

	return (
		<View className="p-7 items-center w-full">
			{hasTasks ? (
				<Text>Task list</Text>
			) : (
				<NoTask onSync={() => setHasTasks(true)} />
			)}
		</View>
	);
};

export default TasksScreen;
