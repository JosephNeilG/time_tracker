import { COLORS } from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RememberMeRowProps {
	value: boolean;
	show_forgot_password?: boolean;
	onValueChange: (checked: boolean) => void;
	onForgotPasswordPress?: () => void;
}

const RememberMeRow = ({
	value,
	onValueChange,
	show_forgot_password = false,
	onForgotPasswordPress,
}: RememberMeRowProps) => {
	return (
		<View className="w-full flex-row items-center justify-between mt-2">
			<View className="flex-row items-center">
				<Checkbox
					onValueChange={onValueChange}
					value={value}
					color={value ? COLORS.primary : undefined}
				/>
				<Text className="ml-2 text-lg text-dark-100 font-medium">
					Remember me
				</Text>
			</View>

			{show_forgot_password && (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={onForgotPasswordPress}>
					<Text className="text-lg text-dark-100 font-medium">
						Forgot password?
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default RememberMeRow;
