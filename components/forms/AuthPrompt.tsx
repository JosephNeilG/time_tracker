import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AuthPromptProps {
	question: string;
	action_text: string;
	onPress: () => void;
}

const AuthPrompt = ({ question, action_text, onPress }: AuthPromptProps) => {
	return (
		<View className="flex-row justify-center mt-7">
			<Text className="text-dark-100 text-lg font-medium">
				{question}{" "}
			</Text>

			<TouchableOpacity onPress={onPress}>
				<Text className="text-primary underline font-medium text-lg">
					{action_text}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AuthPrompt;
