export type PendingActionType = "delete" | "complete" | "undo";

export type TrackPendingActionType = "delete" | "complete";

export interface PendingAction {
	type: PendingActionType;
	task_id: number;
	task_title: string;
}
