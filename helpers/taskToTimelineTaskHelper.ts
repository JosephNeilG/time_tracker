import { Task } from "@/entities/Task";
import { TimelineTask } from "@/entities/TimelineTask";

/**
 * DOCU: Convert store tasks to TimelineTask array
 * Displays tasks playing or completed
 * @param tasks Array of Task from the store
 * @returns Array of TimelineTask for TimelineTable
 */
export const mapTasksToTimeline = (tasks: Task[]): TimelineTask[] => {
	/* Include played and or completed tasks */
	const active_tasks = tasks.filter(
		(task) =>
			(task.time_elapsed && task.time_elapsed > 0) ||
			task.status === "completed"
	);

	/* Calculate start and end dates, then returns tasks with TimelineTask shape */
	return active_tasks.map((task) => {
		const start_date = new Date();
		const end_date = new Date(
			start_date.getTime() + (task.time_elapsed ?? 0) * 1000
		);

		return {
			title: task.title,
			startDate: start_date,
			endDate: end_date,
			color: "#29344C",
			type: "work",
		};
	});
};
