import { COLORS } from "@/constants/Colors";
import { useAppStore } from "@/store/appStore";

const startBreak = () => {
	const quick_task_id = Date.now();

	const counter = useAppStore.getState().break_counter;
	const break_number = String(counter).padStart(3, "0");

	const BREAK = {
		id: quick_task_id,
		title: `Break #${break_number}`,
		description: "Rest time",
		category: "Break",
		status: "tracking",
		media_icon: "pause",
		icon_name: "mug-saucer",
		right_text: "",
		time_stamp: "00:00:00",
		start_time: new Date().toISOString(),
		time_elapsed: 0,
		dot_color: COLORS.dark300,
	};

	useAppStore.getState().incrementBreakCounter();

	return BREAK;
};

export default startBreak;
