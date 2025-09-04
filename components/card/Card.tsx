import React, { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

import { COLORS } from "@/constants/Colors";

interface CardProps {
	children: ReactNode;
	background_color?: string;
	style?: StyleProp<ViewStyle>;
	border_color?: string;
	onPress?: () => void;
}

const Card = ({
	children,
	background_color,
	border_color = COLORS.dark200,
	style,
	onPress,
}: CardProps) => {
	return (
		<Pressable
			onPress={onPress}
			className="w-full mb-4 p-4 rounded-lg border-[0.5px]"
			style={[
				{
					backgroundColor: background_color ?? "transparent",
					borderColor: border_color,
				},
				style,
			]}>
			{children}
		</Pressable>
	);
};

export default Card;
