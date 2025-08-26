import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#111928",
				tabBarInactiveTintColor: "#6B7580",
				tabBarStyle: {
					height: 85,
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
				tabBarIconStyle: {
					marginVertical: 7,
				},
			}}>
			<Tabs.Screen
				name="track"
				options={{
					title: "Track",
					tabBarIcon: ({ color, size }) => (
						<FontAwesome6 name="play" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="tasks"
				options={{
					title: "Tasks",
					tabBarIcon: ({ color, size }) => (
						<FontAwesome6 name="list-ul" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="analytics"
				options={{
					title: "Analytics",
					tabBarIcon: ({ color, size }) => (
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

export default _layout;
