import { FontAwesome6 } from "@expo/vector-icons";

export interface TrackTask {
	id: number;
	category_icon_name: keyof typeof FontAwesome6.glyphMap;
	task_title: string;
	task_category_name: string;
	task_time_estimate: number;
	media_status_icon: keyof typeof FontAwesome6.glyphMap;
}
