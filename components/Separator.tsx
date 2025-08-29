import React from "react";
import { Text, View } from "react-native";

interface SeparatorProps {
	text?: string;
}

const Separator = ({ text }: SeparatorProps) => {
	return (
		<View className="flex-row items-center w-full">
			<View className={lineStyle} />
			<Text className="mx-4 text-lg text-secondary">{text}</Text>
			<View className={lineStyle} />
		</View>
	);
};

const lineStyle = "flex-1 h-[0.5px] bg-secondary";

export default Separator;
