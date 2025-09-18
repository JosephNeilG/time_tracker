import { Task } from "@/entities/Task";

export interface CreateTask {
	title: string;
	category: string;
	priority: string;
	time_estimate: number;
}

const createTaskHelper = (values: CreateTask) => {
	const task_id = Date.now();

	const TASK: Task = {
		id: task_id,
		title: values.title,
		category: values.category,
		status: "todo",
		media_icon: "play",
		icon_name: CATEGORY_ICONS[values.category],
		right_text: values.priority,
		time_estimate: values.time_estimate,
		time_stamp: "00:00:00",
		start_time: new Date().toISOString(),
		time_elapsed: 0,
		time_logged: "00:00:00",
		dot_color: "",
		progress_percent: "",
	};

	return TASK;
};

const CATEGORY_ICONS: Record<CreateTask["category"], string> = {
	Backend: "server",
	Frontend: "desktop",
	QA: "bug",
};

export default createTaskHelper;
