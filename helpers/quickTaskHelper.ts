import { useAppStore } from "@/store/appStore";

const createQuickTask = () => {
	const quickTaskId = Date.now();

	const counter = useAppStore.getState().quick_task_counter;
	const task_number = String(counter).padStart(3, "0");

	const QUICK_TASK = {
		id: quickTaskId,
		title: `Quick Task #${task_number}`,
		category: "Unplanned Work",
		time_estimate: "N/A",
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
