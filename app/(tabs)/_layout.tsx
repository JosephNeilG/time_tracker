import { COLORS } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const handleProfileOnPress = () => {
	router.push("/auth");
};

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.secondary,
				tabBarStyle: {
					height: 85,
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
				tabBarIconStyle: {
					marginVertical: 7,
				},
				sceneStyle: {
					backgroundColor: COLORS.white,
				},
				headerRight: () => renderRightActions(),
				headerTitleAlign: "left",
				headerStyle: {
					height: 105,
				},
				headerTitleStyle: {
					fontSize: 20,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Track",
					headerTitle: "TimeTracker",

					tabBarIcon: ({ color }) => (
						<FontAwesome6 name="play" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="tasks"
				options={{
					title: "Tasks",
					headerTitle: "TimeTracker",
					tabBarIcon: ({ color }) => (
						<FontAwesome6 name="list-ul" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="analytics"
				options={{
					title: "Analytics",
					headerTitle: "Analytics",
					tabBarIcon: ({ color }) => (
						<FontAwesome6
							name="chart-bar"
							size={22}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

const renderRightActions = () => (
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

export default _layout;
