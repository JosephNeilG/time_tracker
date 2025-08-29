import { COLORS } from "@/constants/Colors";

export const STATUS_CONFIG = {
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
		badge: { text: "Completed", color: COLORS.secondary },
		title_decoration: "line-through",
		media_status_icon: {
			border_color: "transparent",
		},
	},
	todo: {
		badge: { text: "TO DO", color: COLORS.secondary },
	},
};
