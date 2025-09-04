import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { COLORS } from "@/constants/Colors";

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
					marginHorizontal: 1,
				},
				style,
			]}
		/>
	);
};

export default DotSeparator;
