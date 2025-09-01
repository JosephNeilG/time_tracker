export interface TimelineTask {
	title: string;
	startDate: string | Date;
	endDate: string | Date;
	color: string;
	is_break?: boolean;
	type: "work" | "break";
}
