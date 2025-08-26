import { COLORS } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from "react-native";

interface AppTextInputProps extends TextInputProps {
	label: string;
	icon_name?: keyof typeof FontAwesome6.glyphMap;
	is_password?: boolean;
}

const AppTextInput = ({
	label,
	placeholder,
	icon_name,
	is_password = false,
	...other_props
}: AppTextInputProps) => {
	const [secure, setSecure] = useState(is_password);

	const toggleSecure = () => setSecure((prev) => !prev);

	return (
		<View className="w-full mb-4">
			<Text className="mb-2 text-lg text-primary font-medium">
				{label}
			</Text>

			<View className="w-full border-[0.5px] border-secondary p-4 rounded-lg flex-row items-center gap-4">
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={COLORS.primary}
					style={{
						flex: 1,
						fontSize: 16,
						color: COLORS.primary,
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
