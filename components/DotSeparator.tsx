import { COLORS } from "@/constants/Colors";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface DotSeparatorProps {
	color?: string;
	style?: StyleProp<ViewStyle>;
	size?: number;
}

const DotSeparator = ({
	color = COLORS.dark100,
	style,
	size = 3,
}: DotSeparatorProps) => {
	return (
		<View
			style={[
				{
					width: size,
					height: size,
					backgroundColor: color,
					borderRadius: size / 2,
					marginHorizontal: 4,
				},
				style,
			]}
		/>
	);
};

export default DotSeparator;
