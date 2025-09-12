import React from "react";
import { Text } from "react-native";

interface ErrorMessageProps {
	message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	if (!message) return null;

	return <Text className="text-red-500 text-sm">{message}</Text>;
};

export default ErrorMessage;
