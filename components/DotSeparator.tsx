import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface DotSeparatorProps {
	color?: string;
	style?: StyleProp<ViewStyle>;
	size?: number;
}

const DotSeparator = ({
	color = "#414851",
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
