export interface TimelineItem {
	title: string;
	startDate: string | Date;
	endDate: string | Date;
	color: string;
	isBreak?: boolean;
	type: "work" | "break";
}
