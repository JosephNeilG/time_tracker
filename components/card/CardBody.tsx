import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";

import DotSeparator from "@/components/DotSeparator";
import { COLORS } from "@/constants/Colors";
import Icon from "../Icon";

interface CardBodyProps {
	category_icon_name: keyof typeof FontAwesome6.glyphMap;
	category_icon_background?: string;
	task_title: string;
	title_color?: string;
	title_decoration?: TextStyle["textDecorationLine"];
	task_category_name: string;
	task_time_estimate: string;
	subtitle_color?: string;
	media_status_icon?: keyof typeof FontAwesome6.glyphMap;
	media_status_icon_color?: string;
	media_status_icon_bg_color?: string;
	media_status_icon_border_color?: string;
}

const CardBody = ({
	category_icon_name,
	category_icon_background = COLORS.light300,
	task_title,
	task_category_name,
	task_time_estimate,
	title_color = COLORS.primary,
	title_decoration,
	subtitle_color = COLORS.dark100,
	media_status_icon = "play",
	media_status_icon_color = COLORS.secondary,
	media_status_icon_bg_color = "transparent",
	media_status_icon_border_color = COLORS.dark200,
}: CardBodyProps) => {
	return (
		<View className="flex-row items-center justify-between">
			<View className="flex-row gap-3 flex-1 items-center">
				<Icon
					name={category_icon_name}
					IconSet={FontAwesome6}
					container_color={category_icon_background}
					icon_color={COLORS.light100}
					size={45}
					icon_size={18}
					style={{ borderRadius: 9 }}
				/>

				<View className="flex-1">
					<Text
						className="text-lg font-medium "
						style={{
							color: title_color,
							textDecorationLine: title_decoration,
						}}
						numberOfLines={1}
						ellipsizeMode="tail">
						{task_title}
					</Text>

					<View className="flex-row items-center flex-wrap gap-1">
						<Text
							className="text-base font-medium"
							style={{ color: subtitle_color }}
							numberOfLines={1}
							ellipsizeMode="tail">
							{task_category_name}
						</Text>

						<DotSeparator color={subtitle_color} />

						<Text
							className="text-base font-medium"
							style={{ color: subtitle_color }}
							numberOfLines={1}
							ellipsizeMode="tail">
							{task_time_estimate}
						</Text>
					</View>
				</View>
			</View>

			<TouchableOpacity>
				<Icon
					is_circle
					name={media_status_icon}
					IconSet={FontAwesome6}
					container_color={media_status_icon_bg_color}
					icon_color={media_status_icon_color}
					size={35}
					icon_size={15}
					border_width={0.5}
					border_color={media_status_icon_border_color}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default CardBody;
