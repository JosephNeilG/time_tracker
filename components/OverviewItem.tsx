import { COLORS } from "@/constants/Colors";
import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface TaskOverviewItemProps {
	title: string | number;
	subtitle: string;
	style?: StyleProp<ViewStyle>;
	title_size?: number;
	title_color?: string;
	align?: "left" | "center" | "right";
}

const OverviewItem = ({
	title,
	subtitle,
	style,
	title_size = 14,
	title_color = COLORS.dark100,
	align = "left",
}: TaskOverviewItemProps) => {
	const textAlign: TextStyle["textAlign"] = align;

	return (
		<View style={style}>
			<Text
				className="font-medium"
				style={{
					fontSize: title_size,
					color: title_color,
					textAlign,
				}}>
				{title}
			</Text>
			<Text
				className="text-dark-100 text-base font-medium"
				style={{ textAlign }}>
				{subtitle}
			</Text>
		</View>
	);
};

export default OverviewItem;
