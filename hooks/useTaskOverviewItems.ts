import { TASK_OVERVIEW_ITEMS } from "@/constants/tasks/TaskOverviewItems";
import { TaskOverViewItems } from "@/entities/TaskOverviewItems";
import useFetch from "./useFetch";

const fetchTaskOverviewItems = async (): Promise<TaskOverViewItems[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(TASK_OVERVIEW_ITEMS);
		}, 2000);
	});
};

const useTaskOverviewItems = () => {
	return useFetch<TaskOverViewItems[]>(fetchTaskOverviewItems);
};

export default useTaskOverviewItems;
