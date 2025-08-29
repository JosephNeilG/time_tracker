import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";

interface IconProps {
	container_color?: string;
	size?: number;
	is_circle?: boolean;
	name: keyof typeof FontAwesome6.glyphMap;
	icon_size?: number;
	icon_color?: string;
	style?: ViewStyle;
	IconSet?: React.ComponentType<any>;
	border_width?: number;
	border_color?: string;
}

const Icon = ({
	container_color = "#111928",
	size = 75,
	is_circle = false,
	name,
	icon_size = 35,
	icon_color = "#fff",
	style,
	IconSet = FontAwesome6,
	border_width,
	border_color,
}: IconProps) => {
	return (
		<View
			className="justify-center items-center"
			style={[
				{
					backgroundColor: container_color,
					width: size,
					height: size,
					borderRadius: is_circle ? size / 2 : 12,
					borderWidth: border_width,
					borderColor: border_color,
				},
				style,
			]}>
			<IconSet name={name} size={icon_size} color={icon_color} />
		</View>
	);
};

export default Icon;
