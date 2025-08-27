import Button from "@/components/Button";
import AuthPrompt from "@/components/forms/AuthPrompt";
import AppTextInput from "@/components/forms/TextInput";
import Icon from "@/components/Icon";
import Separator from "@/components/Separator";
import TextGroup from "@/components/TextGroup";
import { COLORS } from "@/constants/Colors";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";

import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const AuthScreen = () => {
	const [is_checked, setChecked] = useState(false);

	return (
		<View className="flex-1 justify-center">
			<KeyboardAvoidingView
				behavior="position"
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="flex-1 items-center p-7">
						<Icon
							IconSet={MaterialCommunityIcons}
							name="clock-time-four"
						/>
						<TextGroup
							title="TimeTracker"
							sub_title="Track your sprint tasks efficiently"
							style={{ marginBottom: 25 }}
						/>
						<TextGroup
							title="Welcome back"
							title_size={20}
							sub_title="Sign in to continue tracking your tasks"
						/>

						<Button
							icon_name="google"
							IconComponent={FontAwesome6}
							text="Continue with Google"
							style={{ marginVertical: 25 }}
						/>

						<Separator text="or" />

						<AppTextInput
							label="Email"
							placeholder="Enter your email"
							keyboardType="email-address"
							textContentType="emailAddress"
							autoCapitalize="none"
							autoCorrect={false}
						/>
						<AppTextInput
							label="Password"
							placeholder="Enter your password"
							textContentType="password"
							autoCorrect={false}
							autoCapitalize="none"
							is_password
						/>

						<View className="w-full flex-row items-center justify-between mt-1 mb-4">
							<View className="flex-row items-center">
								<Checkbox
									onValueChange={setChecked}
									value={is_checked}
									color={
										is_checked ? COLORS.primary : undefined
									}
								/>
								<Text className="ml-2 text-lg text-dark-100">
									Remember me
								</Text>
							</View>

							<TouchableOpacity activeOpacity={0.7}>
								<Text className="text-lg text-dark-100">
									Forgot password?
								</Text>
							</TouchableOpacity>
						</View>

						<Button
							onPress={() => router.replace("/")}
							text="Sign In"
							background_color={COLORS.primary}
							text_color={COLORS.white}
						/>

						<AuthPrompt
							onPress={() => console.log("Pressed")}
							question="Don't have an account?"
							action_text="Sign up"
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default AuthScreen;
