import { COLORS } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface CardHeaderProps {
	children: ReactNode;
	right_text: string;
	text_color?: string;
	style?: StyleProp<ViewStyle>;
	text_style?: StyleProp<TextStyle>;
}

const CardHeader = ({
	children,
	right_text,
	text_color = COLORS.secondary,
	style,
	text_style,
}: CardHeaderProps) => {
	return (
		<View
			className="flex-row items-center justify-between mb-3"
			style={style}>
			{children}
			<Text
				style={[{ color: text_color }, text_style]}
				className="text-sm">
				{right_text}
			</Text>
		</View>
	);
};

export default CardHeader;
