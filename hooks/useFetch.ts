import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
	const [data, setData] = useState<T | null>(null);
	const [is_loading, setLoading] = useState(false);
	const [is_error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			const result = await fetchFunction();

			setData(result);
		} catch (error) {
			setError(
				error instanceof Error ? error : new Error("An error occurred.")
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (autoFetch) {
			fetchData();
		}
	}, []);

	return { data, is_loading, is_error, refetch: fetchData };
};

export default useFetch;
