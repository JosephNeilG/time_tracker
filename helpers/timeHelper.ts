export const formatTime = (seconds: number): string => {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	const hh = String(hrs).padStart(2, "0");
	const mm = String(mins).padStart(2, "0");
	const ss = String(secs).padStart(2, "0");

	return `${hh}:${mm}:${ss}`;
};

export const formatSecondsToHoursMinutes = (totalSeconds: number): string => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
};
