import { COLORS } from "@/constants/Colors";
import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface BadgeProps {
	text: string;
	background_color?: string;
	text_color?: string;
	style?: StyleProp<ViewStyle>;
}

const Badge = ({
	text,
	background_color = COLORS.light100,
	text_color = COLORS.light100,
	style,
}: BadgeProps) => {
	return (
		<View
			className="py-1 px-2 rounded-lg"
			style={[{ backgroundColor: background_color }, style]}>
			<Text
				className="text-md font-semibold"
				style={{ color: text_color }}>
				{text}
			</Text>
		</View>
	);
};

export default Badge;
