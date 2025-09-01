import { ANALYTICS_TASKS } from "@/constants/analytics/AnalyticsTasks";
import { AnalyticsTasks } from "@/entities/AnalyticsTask";
import useFetch from "./useFetch";

const fetchAnalyticsTasks = async (): Promise<AnalyticsTasks[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(ANALYTICS_TASKS);
		}, 2000);
	});
};

const useAnalyticsTasks = () => {
	return useFetch<AnalyticsTasks[]>(fetchAnalyticsTasks);
};

export default useAnalyticsTasks;
