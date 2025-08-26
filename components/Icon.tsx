import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, ViewStyle } from "react-native";

interface IconProps {
	container_color?: string;
	size?: number;
	is_circle?: boolean;
	name: string;
	icon_size?: number;
	icon_color?: string;
	style?: ViewStyle;
	IconSet?: React.ComponentType<any>;
	borderWidth?: number;
	borderColor?: string;
}

const Icon = ({
	container_color = "#111928",
	size = 75,
	is_circle = false,
	name,
	icon_size = 35,
	icon_color = "#fff",
	style,
	IconSet = MaterialCommunityIcons,
	borderWidth,
	borderColor,
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
					borderWidth,
					borderColor,
				},
				style,
			]}>
			<IconSet name={name} size={icon_size} color={icon_color} />
		</View>
	);
};

export default Icon;
