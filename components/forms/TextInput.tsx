import { COLORS } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	StyleProp,
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";

interface AppTextInputProps extends TextInputProps {
	label?: string;
	icon_name?: keyof typeof FontAwesome6.glyphMap;
	is_password?: boolean;
	text_input_style?: StyleProp<ViewStyle>;
	container_style?: StyleProp<ViewStyle>;
}

const AppTextInput = ({
	label,
	placeholder,
	icon_name,
	is_password = false,
	text_input_style,
	container_style,
	...other_props
}: AppTextInputProps) => {
	const [secure, setSecure] = useState(is_password);

	const toggleSecure = () => setSecure((prev) => !prev);

	return (
		<View className="w-full mb-1" style={container_style}>
			{label && (
				<Text className="mb-2 text-lg text-dark-500 font-medium">
					{label}
				</Text>
			)}

			<View
				className="w-full border-[1px] border-secondary p-4 rounded-lg flex-row items-center gap-4"
				style={text_input_style}>
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={COLORS.dark500}
					style={{
						flex: 1,
						fontSize: 16,
						color: COLORS.dark500,
						fontWeight: "500",
						paddingVertical: 0,
					}}
					secureTextEntry={secure}
					{...other_props}
				/>

				{is_password && (
					<TouchableOpacity onPress={toggleSecure}>
						<FontAwesome6
							name={secure ? "eye" : "eye-slash"}
							size={17}
							color={COLORS.secondary}
						/>
					</TouchableOpacity>
				)}

				{!is_password && icon_name && (
					<FontAwesome6
						name={icon_name}
						size={17}
						color={COLORS.secondary}
					/>
				)}
			</View>
		</View>
	);
};

export default AppTextInput;
