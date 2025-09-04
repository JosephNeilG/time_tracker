import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/Colors";

interface TabItem {
	label: string;
	IconComponent?: any;
	icon_name?: string;
}

interface MenuBarProps {
	tabs: TabItem[];
	initial_index?: number;
	onTabPress?: (index: number) => void;
}

const MenuBar = ({ tabs, initial_index = 0, onTabPress }: MenuBarProps) => {
	const [active_index, setActiveIndex] = useState(initial_index);

	const handlePress = (index: number) => {
		setActiveIndex(index);
		if (onTabPress) onTabPress(index);
	};

	return (
		<View
			className="p-1 w-full flex-row bg-light-100 my-4 rounded-lg"
			style={{ paddingHorizontal: 0 }}>
			{tabs.map((tab, index) => {
				const isActive = index === active_index;
				return (
					<TouchableOpacity
						key={index}
						className="flex-1 py-2 rounded-lg mx-1 flex-row justify-center items-center gap-3"
						style={{
							backgroundColor: isActive
								? COLORS.white
								: COLORS.light100,
						}}
						onPress={() => handlePress(index)}>
						{tab.IconComponent && tab.icon_name && (
							<tab.IconComponent
								name={tab.icon_name}
								size={15}
								color={
									isActive ? COLORS.primary : COLORS.dark100
								}
							/>
						)}
						<Text
							className="text-center font-medium text-lg"
							style={{
								color: isActive
									? COLORS.primary
									: COLORS.dark100,
							}}>
							{tab.label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default MenuBar;
