import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import { COLORS } from "@/constants/Colors";
import { TAB_BAR_ICONS } from "@/constants/TabBarIcons";
import { NavigationStyles } from "@/stylesheets/NavigationStyles";
import TabBarButton from "./TabBarButton";

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

	const button_width = dimensions.width / state.routes.length;

	const onTabBarLayout = (e: LayoutChangeEvent) => {
		setDimensions({
			height: e.nativeEvent.layout.height,
			width: e.nativeEvent.layout.width,
		});
	};

	const tab_position_x = useSharedValue(0);

	useEffect(() => {
		tab_position_x.value = withSpring(button_width * state.index, {
			duration: 1500,
		});
	}, [state.index, button_width, tab_position_x]);

	const animated_style = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: tab_position_x.value }],
		};
	});

	return (
		<View
			onLayout={onTabBarLayout}
			className={tabBarStyles}
			style={NavigationStyles.tabBar}>
			<Animated.View
				style={[
					animated_style,
					{
						position: "absolute",
						backgroundColor: COLORS.light100,
						borderRadius: 30,
						marginHorizontal: 12,
						height: dimensions.height - 15,
						width: button_width - 25,
					},
				]}
			/>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					typeof options.tabBarLabel === "string"
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const is_focused = state.index === index;

				const onPress = () => {
					tab_position_x.value = withSpring(button_width * index, {
						duration: 500,
					});
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!is_focused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<TabBarButton
						key={route.name}
						onPress={onPress}
						onLongPress={onLongPress}
						is_focused={is_focused}
						route_name={route.name as keyof typeof TAB_BAR_ICONS}
						color={is_focused ? COLORS.white : COLORS.primary}
						label={label}
					/>
				);
			})}
		</View>
	);
}

const tabBarStyles =
	"absolute bottom-[20px] flex-row justify-between items-center mx-[25px] py-[10px] rounded-[35px]";

export default TabBar;
