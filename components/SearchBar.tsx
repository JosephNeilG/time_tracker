import React from "react";

import { COLORS } from "@/constants/Colors";
import { StyleProp, ViewStyle } from "react-native";
import AppTextInput from "./forms/TextInput";

interface SearchBarProps {
	container_style?: StyleProp<ViewStyle>;
}

const SearchBar = ({ container_style }: SearchBarProps) => {
	return (
		<AppTextInput
			placeholder="Search tasks"
			placeholderTextColor={COLORS.secondary}
			icon_name="magnifying-glass"
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
