import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import TextInput from "@/components/forms/TextInput";
import { COLORS } from "@/constants/Colors";
import { SignInData, SignInSchema } from "@/schema/signInSchema";
import RememberMeRow from "./RememberMeRow";

const SignInForm = () => {
	const [is_checked, setChecked] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInData>({
		resolver: zodResolver(SignInSchema),
		mode: "onChange",
		defaultValues: { email: "", password: "" },
	});

	const handleFormSubmit = (data: SignInData) => {
		console.log("Sign in:", data);
		router.replace("/");
	};

	return (
		<View>
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, value, onBlur } }) => (
					<>
						<TextInput
							label="Email"
							placeholder="Enter your email"
							keyboardType="email-address"
							textContentType="emailAddress"
							autoCapitalize="none"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
						/>
						<ErrorMessage message={errors.email?.message} />
					</>
				)}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, value, onBlur } }) => (
					<>
						<TextInput
							label="Password"
							placeholder="Enter your password"
							textContentType="password"
							is_password
							autoCapitalize="none"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
						/>
						<ErrorMessage message={errors.password?.message} />
					</>
				)}
			/>

			<RememberMeRow
				onValueChange={setChecked}
				value={is_checked}
				show_forgot_password
			/>

			<Button
				onPress={handleSubmit(handleFormSubmit)}
				text={isSubmitting ? "Signing in..." : "Sign In"}
				background_color={COLORS.primary}
				text_color={COLORS.white}
				style={{ marginTop: 15 }}
			/>
		</View>
	);
};

export default SignInForm;
