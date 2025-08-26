import DotSeparator from "@/components/DotSeparator";
import { COLORS } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import Icon from "../Icon";

interface CardBodyProps {
	leftIconName: keyof typeof FontAwesome6.glyphMap;
	leftIconColor?: string;
	leftIconBackground?: string;
	leftIconSize?: number;
	leftIconInnerSize?: number;
	title: string;
	subtitleLeft: string;
	subtitleRight: string;
	titleColor?: string;
	titleDecoration?: TextStyle["textDecorationLine"];
	subtitleColor?: string;
	rightIconName: keyof typeof FontAwesome6.glyphMap;
	rightIconColor?: string;
	rightIconBackground?: string;
	rightIconSize?: number;
	rightIconInnerSize?: number;
	rightIconBorderWidth?: number;
	rightIconBorderColor?: string;
}

const CardBody = ({
	leftIconName,
	leftIconColor = COLORS.light100,
	leftIconBackground = COLORS.light300,
	leftIconSize = 45,
	leftIconInnerSize = 18,
	title,
	subtitleLeft,
	subtitleRight,
	titleColor = COLORS.primary,
	titleDecoration,
	subtitleColor = COLORS.secondary,
	rightIconName,
	rightIconColor = COLORS.light100,
	rightIconBackground = COLORS.dark100,
	rightIconSize = 35,
	rightIconInnerSize = 15,
	rightIconBorderWidth = 0,
	rightIconBorderColor = "transparent",
}: CardBodyProps) => {
	return (
		<View className="flex-row items-center justify-between">
			<View className="flex-row gap-3 flex-1 items-center">
				<Icon
					name={leftIconName}
					IconSet={FontAwesome6}
					container_color={leftIconBackground}
					icon_color={leftIconColor}
					size={leftIconSize}
					icon_size={leftIconInnerSize}
					style={{ borderRadius: 9 }}
				/>

				<View className="flex-1">
					<Text
						className="text-lg font-medium"
						style={{
							color: titleColor,
							textDecorationLine: titleDecoration,
						}}>
						{title}
					</Text>

					<View className="flex-row items-center flex-wrap gap-1">
						<Text
							className="text-base font-medium"
							style={{ color: subtitleColor }}
							numberOfLines={1}
							ellipsizeMode="tail">
							{subtitleLeft}
						</Text>

						<DotSeparator color={subtitleColor} />

						<Text
							className="text-base font-medium"
							style={{ color: subtitleColor }}
							numberOfLines={1}
							ellipsizeMode="tail">
							{subtitleRight}
						</Text>
					</View>
				</View>
			</View>

			<TouchableOpacity>
				<Icon
					is_circle
					name={rightIconName}
					IconSet={FontAwesome6}
					container_color={rightIconBackground}
					icon_color={rightIconColor}
					size={rightIconSize}
					icon_size={rightIconInnerSize}
					borderWidth={rightIconBorderWidth}
					borderColor={rightIconBorderColor}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default CardBody;
