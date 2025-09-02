import React from "react";
import { ActivityIndicator, Text } from "react-native";

const LoadingIndicator = () => {
	return (
		<>
			<ActivityIndicator size="large" />
			<Text className="mt-2 text-gray-500">Loading tasks...</Text>
		</>
	);
};

export default LoadingIndicator;
