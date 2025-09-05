export const formatTime = (total_seconds: number): string => {
	const hrs = Math.floor(total_seconds / 3600);
	const mins = Math.floor((total_seconds % 3600) / 60);
	const secs = total_seconds % 60;

	const hh = String(hrs).padStart(2, "0");
	const mm = String(mins).padStart(2, "0");
	const ss = String(secs).padStart(2, "0");

	return `${hh}:${mm}:${ss}`;
};

export const formatSecondsToHoursMinutes = (total_seconds: number): string => {
	const hours = Math.floor(total_seconds / 3600);
	const minutes = Math.floor((total_seconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
};

export const formatSecondstoMinutes = (total_seconds: number): string => {
	const minutes = Math.floor((total_seconds % 3600) / 60);

	return `${minutes}m`;
};
