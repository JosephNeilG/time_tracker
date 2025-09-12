import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z as Zod } from "zod";

import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import TextInput from "@/components/forms/TextInput";
import { COLORS } from "@/constants/Colors";
import RememberMeRow from "./RememberMeRow";

const SignUpSchema = Zod.object({
	email: Zod.email("Invalid email format"),
	password: Zod.string().min(6, "Password must be at least 6 characters"),
	confirm_password: Zod.string().min(
		6,
		"Confirm Password must be at least 6 characters"
	),
}).refine((data) => data.password === data.confirm_password, {
	message: "Passwords do not match",
	path: ["confirm_password"],
});

type SignUpData = Zod.infer<typeof SignUpSchema>;

const SignUpForm = () => {
	const [is_checked, setChecked] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpData>({
		resolver: zodResolver(SignUpSchema),
		mode: "onChange",
		defaultValues: { email: "", password: "", confirm_password: "" },
	});

	const handleFormSubmit = (data: SignUpData) => {
		console.log("Sign up:", data);
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

			<Controller
				control={control}
				name="confirm_password"
				render={({ field: { onChange, value, onBlur } }) => (
					<>
						<TextInput
							label="Confirm Password"
							placeholder="Re-enter your password"
							textContentType="password"
							is_password
							autoCapitalize="none"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
						/>
						<ErrorMessage
							message={errors.confirm_password?.message}
						/>
					</>
				)}
			/>

			<RememberMeRow onValueChange={setChecked} value={is_checked} />

			<Button
				onPress={handleSubmit(handleFormSubmit)}
				text={isSubmitting ? "Signing up..." : "Sign Up"}
				background_color={COLORS.primary}
				text_color={COLORS.white}
				style={{ marginTop: 15 }}
			/>
		</View>
	);
};

export default SignUpForm;
