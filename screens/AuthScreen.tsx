import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

import Button from "@/components/Button";
import AuthPrompt from "@/components/forms/AuthPrompt";
import SignInForm from "@/components/forms/SignInForm";
import SignUpForm from "@/components/forms/SignUpForm";
import Icon from "@/components/Icon";
import Separator from "@/components/Separator";
import TextGroup from "@/components/TextGroup";
import { COLORS } from "@/constants/Colors";

const AuthScreen = () => {
	const [is_sign_in, setIsSignIn] = useState(true);

	const handleAuthToggle = () => setIsSignIn(!is_sign_in);

	const handleGoogleOnPress = () => {
		router.replace("/");
	};

	return (
		<View className="flex-1 justify-center bg-white">
			<KeyboardAvoidingView behavior="position">
				<ScrollView
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled">
					<View className="flex-1 p-7">
						<View className="w-full items-center">
							<Icon
								IconSet={MaterialCommunityIcons}
								name="clock-time-four"
								container_color={COLORS.primary}
							/>
						</View>
						<TextGroup
							title="TimeTracker"
							sub_title="Track your sprint tasks efficiently"
							style={{ marginBottom: 25 }}
						/>
						<TextGroup
							title={
								is_sign_in
									? "Welcome back"
									: "Create an account"
							}
							title_size={20}
							sub_title={
								is_sign_in
									? "Sign in to continue tracking your tasks"
									: "Sign up to start tracking your tasks"
							}
						/>

						<Button
							onPress={handleGoogleOnPress}
							icon_name="google"
							IconComponent={FontAwesome6}
							text="Continue with Google"
							style={{ marginVertical: 25 }}
						/>

						<Separator text="or" />

						{is_sign_in ? <SignInForm /> : <SignUpForm />}

						<AuthPrompt
							onPress={handleAuthToggle}
							question={
								is_sign_in
									? "Don't have an account?"
									: "Already have an account?"
							}
							action_text={is_sign_in ? "Sign up" : "Sign in"}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default AuthScreen;
