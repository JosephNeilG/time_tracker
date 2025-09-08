import { Task } from "@/entities/Task";
import { TrackTask } from "@/entities/TrackTask";

/**
 * DOCU: Converts a full Task object into smaller TrackTask object
 * @param task - Full task object with detailed properties
 * @returns object that is simplifies task object
 */
export const toTrackTask = (task: Task): TrackTask => ({
	id: task.id,
	category_icon_name: task.icon_name,
	task_title: task.title,
	task_category_name: task.category,
	task_time_estimate: task.time_estimate,
	media_status_icon: task.media_icon,
});
