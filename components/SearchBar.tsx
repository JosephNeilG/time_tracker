import React from "react";

import { COLORS } from "@/constants/Colors";
import { StyleProp, ViewStyle } from "react-native";
import AppTextInput from "./forms/TextInput";

interface SearchBarProps {
	container_style?: StyleProp<ViewStyle>;
	value?: string;
	onChangeText?: (text: string) => void;
}

const SearchBar = ({
	container_style,
	value,
	onChangeText,
}: SearchBarProps) => {
	return (
		<AppTextInput
			placeholder="Search tasks"
			placeholderTextColor={COLORS.secondary}
			icon_name="magnifying-glass"
			value={value}
			onChangeText={onChangeText}
			text_input_style={[
				{
					backgroundColor: COLORS.light400,
					borderColor: "transparent",
				},
			]}
			container_style={container_style}
		/>
	);
};

export default SearchBar;
