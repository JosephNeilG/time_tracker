import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

import { COLORS } from "@/constants/Colors";
import { NavigationStyles } from "@/stylesheets/NavigationStyles";
import Icon from "./Icon";

interface FABProps {
	onPress: () => void;
}

const FloatingActionButton = ({ onPress }: FABProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="absolute right-[25px] bottom-[100px]"
			style={NavigationStyles.fab}>
			<Icon
				name="bolt"
				IconSet={FontAwesome6}
				is_circle
				size={60}
				icon_size={20}
				container_color={COLORS.dark600}
			/>
		</TouchableOpacity>
	);
};

export default FloatingActionButton;
