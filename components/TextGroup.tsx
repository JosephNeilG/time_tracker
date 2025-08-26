import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface TextGroupProps {
	title: string;
	sub_title: string;
	title_size?: number;
	subtitle_size?: number;
	style?: StyleProp<ViewStyle>;
}

const TextGroup = ({
	title,
	sub_title,
	title_size = 24,
	style,
}: TextGroupProps) => {
	return (
		<View className="items-center mt-4" style={style}>
			<Text
				className="text-3xl font-medium color-primary mb-1"
				style={{ fontSize: title_size }}>
				{title}
			</Text>
			<Text className="text-lg color-secondary font-medium">
				{sub_title}
			</Text>
		</View>
	);
};

export default TextGroup;
