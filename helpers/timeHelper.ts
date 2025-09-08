/**
 * DOCU: formatTime - Conver total seconds into HH:MM:SS format
 * @param total_seconds: Total secods to format
 * @returns string formatted to "HH:MM:SS"
 */
export const formatTime = (total_seconds: number): string => {
	const hrs = Math.floor(total_seconds / 3600);
	const mins = Math.floor((total_seconds % 3600) / 60);
	const secs = total_seconds % 60;

	const hh = String(hrs).padStart(2, "0");
	const mm = String(mins).padStart(2, "0");
	const ss = String(secs).padStart(2, "0");

	return `${hh}:${mm}:${ss}`;
};

/**
 * DOCU: formatSecondsToHoursMinutes - Convert total seconds into hours and minutes
 * @param total_seconds: Total seconds to convert
 * @returns string formatted to ${hours}h ${minutes}m
 */
export const formatSecondsToHoursMinutes = (total_seconds: number): string => {
	const hours = Math.floor(total_seconds / 3600);
	const minutes = Math.floor((total_seconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
};

/**
 * DOCU: formatSecondsToMinutes - Convert total seconds into minutes
 * @param total_seconds: Total seconds to convert
 * @returns string formatted to ${minutes}m
 */
export const formatSecondsToMinutes = (total_seconds: number): string => {
	const minutes = Math.floor((total_seconds % 3600) / 60);

	return `${minutes}m`;
};
