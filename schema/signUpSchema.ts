import { z as Zod } from "zod";

export const SignUpSchema = Zod.object({
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

export type SignUpData = Zod.infer<typeof SignUpSchema>;
