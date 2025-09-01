import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "./Icon";

interface FABProps {
	onPress: () => void;
}

const FloatingActionButton = ({ onPress }: FABProps) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="absolute m-4 right-0 bottom-0">
			<Icon
				name="bolt"
				IconSet={FontAwesome6}
				is_circle
				size={60}
				icon_size={20}
			/>
		</TouchableOpacity>
	);
};

export default FloatingActionButton;
