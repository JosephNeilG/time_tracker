import { ANALYTICS_OVERVIEW_ITEMS } from "@/constants/analytics/AnalyticsOverviewItems";
import { AnalyticsOverviewItems } from "@/entities/AnalyticsOverviewItems";
import useFetch from "./useFetch";

const fetchAnalyticsOverview = async (): Promise<AnalyticsOverviewItems[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(ANALYTICS_OVERVIEW_ITEMS);
		}, 2000);
	});
};

const useAnalyticsOverviewItems = () => {
	return useFetch<AnalyticsOverviewItems[]>(fetchAnalyticsOverview);
};

export default useAnalyticsOverviewItems;
