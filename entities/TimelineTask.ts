export interface TimelineTask {
	title: string;
	startDate: Date;
	endDate: Date;
	color: string;
	type: "work" | "break";
}
