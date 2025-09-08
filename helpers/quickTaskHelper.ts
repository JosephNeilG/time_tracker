import { useAppStore } from "@/store/appStore";

/**
 * DOCU: createQuickTask - Generates a new quick tas with unique ID
 * Uses the store's quick_task_counter to increment number title.
 */
const createQuickTask = () => {
	const quick_task_id = Date.now();

	const counter = useAppStore.getState().quick_task_counter;
	const task_number = String(counter).padStart(3, "0");

	const QUICK_TASK = {
		id: quick_task_id,
		title: `Quick Task #${task_number}`,
		description: "Ad-hoc",
		category: "Unplanned Work",
		status: "tracking",
		media_icon: "pause",
		icon_name: "bolt",
		right_text: "Low Priority",
		time_stamp: "00:00:00",
	};

	useAppStore.getState().incrementQuickTaskCounter();

	return QUICK_TASK;
};

export default createQuickTask;
