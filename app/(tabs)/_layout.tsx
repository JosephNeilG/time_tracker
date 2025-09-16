import { FontAwesome6 } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import TabBar from "@/components/tabbar/TabBar";
import { COLORS } from "@/constants/Colors";
import { useAppStore } from "@/store/appStore";

const _layout = () => {
	return (
		<Tabs
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerRight: () => renderRightActions(),
				headerTitleAlign: "left",
				headerStyle: {
					height: 105,
				},
				headerTitleStyle: {
					fontSize: 20,
					color: COLORS.primary,
				},
				sceneStyle: {
					backgroundColor: COLORS.white,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Track",
					headerTitle: "TimeTracker",
				}}
			/>
			<Tabs.Screen
				name="tasks"
				options={{
					title: "Tasks",
					headerTitle: "TimeTracker",
				}}
			/>
			<Tabs.Screen
				name="analytics"
				options={{
					title: "Analytics",
					headerTitle: "Analytics",
				}}
			/>
		</Tabs>
	);
};

const renderRightActions = () => {
	const resetAppStore = useAppStore((state) => state.reset);

	const handleProfileOnPress = () => {
		resetAppStore();
		router.navigate("/auth");
	};

	return (
		<View className="flex-row items-center mr-4">
			<TouchableOpacity className="mr-4">
				<FontAwesome6 name="bell" size={18} color={COLORS.secondary} />
			</TouchableOpacity>

			<TouchableOpacity onPress={handleProfileOnPress}>
				<Image
					source={require("@/assets/images/joseph.jpeg")}
					className="w-[40px] h-[40px] rounded-full"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default _layout;
