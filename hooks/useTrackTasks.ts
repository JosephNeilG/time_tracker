import { TRACK_TASKS } from "@/constants/TrackTasks";
import { TrackTask } from "@/entities/TrackTask";
import useFetch from "./useFetch";

const fetchTrackTasks = async (): Promise<TrackTask[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(TRACK_TASKS);
		}, 2000);
	});
};

const useTrackTasks = () => {
	return useFetch<TrackTask[]>(fetchTrackTasks);
};

export default useTrackTasks;
