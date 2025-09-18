import { COLORS } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface AppDropdownProps {
	label?: string;
	data: DropdownOption[];
	value?: string | number | null;
	onChange: (value: string | number) => void;
	container_style?: StyleProp<ViewStyle>;
}

type DropdownOption = { label: string; value: string | number };

const AppDropdown = ({
	label,
	data,
	value,
	onChange,
	container_style,
}: AppDropdownProps) => {
	const [selected, setSelected] = useState(value ?? null);

	const renderItem = (item: DropdownOption) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{item.label}</Text>
			</View>
		);
	};

	return (
		<View className="w-full mb-1" style={container_style}>
			{label && (
				<Text className="mb-2 text-lg text-dark-500 font-medium">
					{label}
				</Text>
			)}

			<Dropdown
				onChange={(item) => {
					setSelected(item.value);
					onChange(item.value);
				}}
				renderItem={renderItem}
				style={styles.dropdown}
				data={data}
				value={selected}
				labelField="label"
				valueField="value"
				placeholder="Select..."
				selectedTextStyle={styles.selected_text_style}
				placeholderStyle={styles.placeholder_style}
				maxHeight={300}
			/>
		</View>
	);
};

export default AppDropdown;

const styles = StyleSheet.create({
	dropdown: {
		width: "100%",
		backgroundColor: COLORS.white,
		borderColor: COLORS.secondary,
		borderWidth: 1,
		borderRadius: 9,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	selected_text_style: {
		fontSize: 16,
		color: COLORS.dark500,
		fontWeight: "500",
	},
	placeholder_style: {
		fontSize: 16,
		color: COLORS.dark500,
		fontWeight: "500",
	},
	item: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	textItem: {
		fontSize: 16,
		color: COLORS.dark500,
		fontWeight: "500",
	},
});
