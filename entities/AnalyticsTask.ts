export interface AnalyticsTask {
	id: number;
	task_title: string;
	task_category_name: string;
	task_time_logged: string;
	task_progress_percent: string;
	dot_color?: string;
	time_elapsed?: number;
}
