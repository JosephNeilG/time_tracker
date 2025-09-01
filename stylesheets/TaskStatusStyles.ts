import { COLORS } from "@/constants/Colors";
import { TaskStatus } from "@/entities/Task";
import { TextStyle } from "react-native";

interface TaskStatusStyles {
	background_color: string;
	border_color: string;
	card_text_color: string;
	badge: {
		text: string;
		bg?: string;
		color?: string;
	};
	title_color: string;
	subtitle_color: string;
	title_decoration: TextStyle["textDecorationLine"];
	category_icon_background: string;
	media_status_icon: {
		color?: string;
		bg_color?: string;
		border_color?: string;
	};
}

export const TASK_STATUS_STYLES: Record<TaskStatus, TaskStatusStyles> = {
	tracking: {
		background_color: COLORS.primary,
		border_color: "transparent",
		card_text_color: COLORS.white,
		badge: { text: "TRACKING NOW", bg: COLORS.dark100 },
		title_color: COLORS.light100,
		subtitle_color: COLORS.light300,
		title_decoration: "none",
		category_icon_background: COLORS.dark100,
		media_status_icon: {
			border_color: "transparent",
			bg_color: COLORS.dark100,
			color: COLORS.light100,
		},
	},
	completed: {
		badge: {
			text: "Completed",
			color: COLORS.secondary,
			bg: COLORS.light100,
		},
		title_decoration: "line-through",
		media_status_icon: {
			border_color: "transparent",
			bg_color: "transparent",
			color: COLORS.secondary,
		},
		background_color: "transparent",
		border_color: COLORS.dark200,
		card_text_color: COLORS.secondary,
		title_color: COLORS.primary,
		subtitle_color: COLORS.dark100,
		category_icon_background: COLORS.light300,
	},
	todo: {
		badge: {
			text: "TO DO",
			color: COLORS.secondary,
			bg: COLORS.light100,
		},
		title_decoration: "none",
		media_status_icon: {
			border_color: COLORS.secondary,
			bg_color: "transparent",
			color: COLORS.secondary,
		},
		background_color: "transparent",
		border_color: COLORS.dark200,
		card_text_color: COLORS.secondary,
		title_color: COLORS.primary,
		subtitle_color: COLORS.dark100,
		category_icon_background: COLORS.light300,
	},
};
