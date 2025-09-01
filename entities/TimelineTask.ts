export interface TimelineTask {
	title: string;
	start_date: string | Date;
	end_date: string | Date;
	color: string;
	is_break?: boolean;
	type: "work" | "break";
}
