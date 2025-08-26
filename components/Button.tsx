import { COLORS } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
	text: string;
	icon_name?: keyof typeof FontAwesome6.glyphMap;
	icon_color?: string;
	background_color?: string;
	text_color?: string;
	style?: StyleProp<ViewStyle>;
}

const Button = ({
	text,
	icon_name,
	icon_color = COLORS.tertiary,
	background_color = "transparent",
	text_color = COLORS.primary,
	style,
}: ButtonProps) => {
	return (
		<TouchableOpacity
			className="w-full border-[0.5px] border-secondary py-4 rounded-lg flex-row items-center gap-4 justify-center"
			style={[{ backgroundColor: background_color }, style]}>
			{icon_name && (
				<FontAwesome6 name={icon_name} size={17} color={icon_color} />
			)}

			<Text className="text-xl font-medium" style={{ color: text_color }}>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;
