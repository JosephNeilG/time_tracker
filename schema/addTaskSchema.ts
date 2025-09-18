import { z as Zod } from "zod";

export const AddTaskSchema = Zod.object({
	title: Zod.string().min(3, "Title is required"),
	category: Zod.string().min(1, "Category is required"),
	time_estimate: Zod.number().min(1, "Time is required"),
	priority: Zod.string().min(1, "Priority is required"),
});

export type AddTaskFormValues = Zod.infer<typeof AddTaskSchema>;
