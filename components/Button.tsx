import React from "react";
import {
	DimensionValue,
	StyleProp,
	Text,
	TouchableOpacity,
	ViewStyle,
} from "react-native";

import { COLORS } from "@/constants/Colors";

interface ButtonProps {
	text: string;
	IconComponent?: React.ElementType;
	icon_name?: string;
	icon_size?: number;
	icon_color?: string;
	background_color?: string;
	text_color?: string;
	style?: StyleProp<ViewStyle>;
	width?: DimensionValue;
	onPress?: () => void;
}

const Button = ({
	text,
	IconComponent,
	icon_name,
	icon_size = 17,
	icon_color = COLORS.dark100,
	background_color = "transparent",
	text_color = COLORS.primary,
	style,
	width = "100%",
	onPress,
}: ButtonProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="border-[1px] border-secondary py-4 rounded-lg flex-row items-center gap-4 justify-center"
			style={[{ backgroundColor: background_color, width }, style]}>
			{IconComponent && icon_name && (
				<IconComponent
					name={icon_name}
					size={icon_size}
					color={icon_color}
				/>
			)}

			<Text className="text-xl font-medium" style={{ color: text_color }}>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;
