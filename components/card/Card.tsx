import { COLORS } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface CardProps {
	children: ReactNode;
	background_color?: string;
	style?: StyleProp<ViewStyle>;
	borderColor?: string;
}

const Card = ({
	children,
	background_color,
	borderColor = COLORS.dark200,
	style,
}: CardProps) => {
	return (
		<View
			className="w-full mb-4 p-4 rounded-lg border-[0.5px]"
			style={[
				{
					backgroundColor: background_color ?? "transparent",
					borderColor,
				},
				style,
			]}>
			{children}
		</View>
	);
};

export default Card;
