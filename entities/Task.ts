import { FontAwesome6 } from "@expo/vector-icons";

export interface Task {
	id: number;
	title: string;
	category: string;
	time_estimate: string;
	status: "todo" | "completed" | "tracking";
	media_icon: keyof typeof FontAwesome6.glyphMap;
	icon_name: keyof typeof FontAwesome6.glyphMap;
	right_text: string;
	time_logged: string;
	dot_color: string;
	progress_percent: string;
}
