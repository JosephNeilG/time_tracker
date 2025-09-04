import { Task } from "@/entities/Task";
import { TrackTask } from "@/entities/TrackTask";

export const toTrackTask = (task: Task): TrackTask => ({
	id: task.id,
	category_icon_name: task.icon_name,
	task_title: task.title,
	task_category_name: task.category,
	task_time_estimate: task.time_estimate,
	media_status_icon: task.media_icon,
});
