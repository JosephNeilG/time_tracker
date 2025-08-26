import { COLORS } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface CardProps {
	children: ReactNode;
	backgroundColor?: string;
	style?: StyleProp<ViewStyle>;
	padding?: number;
	borderRadius?: number;
	borderWidth?: number;
	borderColor?: string;
}

const Card = ({
	children,
	backgroundColor,
	padding = 16,
	borderRadius = 8,
	borderWidth = 0,
	borderColor = COLORS.dark100,
	style,
}: CardProps) => {
	return (
		<View
			className="w-full mb-4"
			style={[
				{
					backgroundColor: backgroundColor ?? "transparent",
					padding,
					borderRadius,
					borderWidth,
					borderColor,
				},
				style,
			]}>
			{children}
		</View>
	);
};

export default Card;
