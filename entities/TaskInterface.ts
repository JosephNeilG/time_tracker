import { FontAwesome6 } from "@expo/vector-icons";

export type TaskStatus = "todo" | "completed" | "tracking";

export interface Task {
	id: number;
	title: string;
	category: string;
	time_estimate: string;
	status: TaskStatus;
	media_icon: keyof typeof FontAwesome6.glyphMap;
	icon_name: keyof typeof FontAwesome6.glyphMap;
	right_text: string;
}
