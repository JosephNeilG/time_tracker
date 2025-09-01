import { TASKS } from "@/constants/Tasks";
import { Task } from "@/entities/Task";
import useFetch from "./useFetch";

const fetchTasks = async (): Promise<Task[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(TASKS);
		}, 2000);
	});
};

const useTasks = () => {
	return useFetch<Task[]>(fetchTasks);
};

export default useTasks;
