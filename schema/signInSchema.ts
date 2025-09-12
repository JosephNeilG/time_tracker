import { z as Zod } from "zod";

export const SignInSchema = Zod.object({
	email: Zod.email("Invalid email format"),
	password: Zod.string().min(6, "Password must be at least 6 characters"),
});

export type SignInData = Zod.infer<typeof SignInSchema>;
