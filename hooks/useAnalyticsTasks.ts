import { TASKS } from "@/constants/Tasks";
import { AnalyticsTask } from "@/entities/AnalyticsTask";
import useFetch from "./useFetch";

const fetchAnalyticsTasks = async (): Promise<AnalyticsTask[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
				TASKS.map((task) => ({
					id: task.id,
					dotColor: task.dot_color,
					title: task.title,
					subtitle: task.category,
					time: task.time_logged,
					progress_percent: task.progress_percent,
				}))
			);
		}, 2000);
	});
};

const useAnalyticsTasks = () => {
	return useFetch<AnalyticsTask[]>(fetchAnalyticsTasks);
};

export default useAnalyticsTasks;
