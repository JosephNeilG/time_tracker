import { PlatformPressable } from "@react-navigation/elements";
import React, { ReactNode, useEffect } from "react";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import { COLORS } from "@/constants/Colors";
import { TAB_BAR_ICONS } from "@/constants/TabBarIcons";

interface TabBarButtonProps {
	onPress: () => void;
	onLongPress: () => void;
	is_focused: boolean;
	route_name: keyof typeof TAB_BAR_ICONS;
	color: string;
	label: string | ReactNode;
}

const TabBarButton = ({
	onPress,
	onLongPress,
	is_focused,
	route_name,
	color,
	label,
}: TabBarButtonProps) => {
	const scale = useSharedValue(0);

	useEffect(() => {
		scale.value = withSpring(
			typeof is_focused === "boolean" ? (is_focused ? 1 : 0) : is_focused,
			{ duration: 350 }
		);
	}, [scale, is_focused]);

	const animated_icon_style = useAnimatedStyle(() => {
		const scale_value = interpolate(scale.value, [0, 1], [1, 1.2]);

		const top = interpolate(scale.value, [0, 1], [0, 9]);

		return {
			transform: [
				{
					scale: scale_value,
				},
			],
			top: top,
		};
	});

	const animated_text_style = useAnimatedStyle(() => {
		const opacity = interpolate(scale.value, [0, 1], [1, 0]);

		return {
			opacity,
		};
	});

	return (
		<PlatformPressable
			onPress={onPress}
			onLongPress={onLongPress}
			className={tabBarItemStyles}>
			<Animated.View style={animated_icon_style}>
				{TAB_BAR_ICONS[route_name]({
					color: is_focused ? COLORS.white : COLORS.dark100,
				})}
			</Animated.View>
			<Animated.Text
				style={[
					{
						color: is_focused ? COLORS.primary : COLORS.dark100,
						fontSize: 12,
					},
					animated_text_style,
				]}>
				{label}
			</Animated.Text>
		</PlatformPressable>
	);
};

const tabBarItemStyles = "flex-1 justify-center items-center gap-[5px]";

export default TabBarButton;
