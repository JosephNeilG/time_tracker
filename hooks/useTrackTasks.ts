import { TASKS } from "@/constants/Tasks";
import { TrackTask } from "@/entities/TrackTask";
import useFetch from "./useFetch";

const fetchTrackTasks = async (): Promise<TrackTask[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
				TASKS.filter((task) => task.status !== "completed").map(
					(task) => ({
						id: task.id,
						category_icon_name: task.icon_name,
						task_title: task.title,
						task_category_name: task.category,
						task_time_estimate: task.time_estimate,
						media_status_icon: task.media_icon,
					})
				)
			);
		}, 2000);
	});
};

const useTrackTasks = () => {
	return useFetch<TrackTask[]>(fetchTrackTasks);
};

export default useTrackTasks;
