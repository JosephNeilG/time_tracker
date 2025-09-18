import { COLORS } from "@/constants/Colors";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FormTabItem {
	label: string;
}

interface FormTabsProps {
	label: string;
	tabs: FormTabItem[];
	initial_index?: number;
	onTabSelect?: (index: number) => void;
}

const FormTabs = ({
	label,
	tabs,
	initial_index = 0,
	onTabSelect,
}: FormTabsProps) => {
	const [activeIndex, setActiveIndex] = useState(initial_index);

	const handlePress = (index: number) => {
		setActiveIndex(index);
		if (onTabSelect) onTabSelect(index);
	};

	return (
		<View className="mb-4">
			<Text className="mb-2 text-lg text-dark-500 font-medium">
				{label}
			</Text>
			<View className="flex-row rounded-lg bg-light-400 w-full">
				{tabs.map((tab, index) => {
					const isActive = index === activeIndex;
					return (
						<TouchableOpacity
							key={index}
							className="flex-1 py-2 mx-1 rounded-lg flex-row justify-center items-center"
							style={{
								backgroundColor: isActive
									? COLORS.primary
									: COLORS.light400,
							}}
							onPress={() => handlePress(index)}>
							<Text
								className="text-center font-medium text-lg"
								style={{
									color: isActive
										? COLORS.white
										: COLORS.dark100,
								}}>
								{tab.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default FormTabs;
