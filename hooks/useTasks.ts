import { TASKS } from "@/constants/tasks/Tasks";
import { Task } from "@/entities/Task";
import useFetch from "./useFetch";

const fetchTasks = async (): Promise<Task[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(TASKS);
		}, 2000);
	});
};

const useTask = () => {
	return useFetch<Task[]>(fetchTasks);
};

export default useTask;
