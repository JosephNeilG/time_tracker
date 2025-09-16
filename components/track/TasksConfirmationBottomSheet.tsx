import CustomBottomSheet from "@/components/CustomBottomSheet";
import { COLORS } from "@/constants/Colors";
import { useAppStore } from "@/store/appStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

export interface PendingAction {
	type: "delete" | "complete";
	task_id: number;
	task_title: string;
}

interface TaskActionBottomSheetProps {
	pending_action: PendingAction | null;
	setPendingAction: (action: PendingAction | null) => void;
}

type BottomSheetRef = React.RefObject<BottomSheetModal>;

const TaskConfirmationBottomSheet = forwardRef<
	BottomSheetModal,
	TaskActionBottomSheetProps
>(({ pending_action, setPendingAction }, ref) => {
	const dismissSheet = () => {
		(ref as BottomSheetRef).current?.dismiss();
	};

	const handleConfirm = () => {
		if (!pending_action) return;

		const store = useAppStore.getState();

		if (pending_action.type === "delete") {
			store.deleteTask(pending_action.task_id);
		} else {
			store.completeTask(pending_action.task_id);
		}

		setPendingAction(null);
		dismissSheet();
	};

	const handleCancel = () => {
		setPendingAction(null);
		dismissSheet();
	};

	return (
		<CustomBottomSheet
			ref={ref}
			title={
				pending_action?.type === "delete"
					? "Delete Task?"
					: "Mark as Complete?"
			}
			sub_title={
				pending_action?.type === "delete"
					? `You are about to delete "${pending_action?.task_title}".`
					: `Mark "${pending_action?.task_title}" as completed.`
			}
			confirm_button_text={
				pending_action?.type === "delete" ? "Delete" : "Mark Complete"
			}
			confirm_button_bg_color={
				pending_action?.type === "delete"
					? COLORS.danger
					: COLORS.primary
			}
			icon_name={
				pending_action?.type === "delete" ? "trash-can" : "check"
			}
			icon_color={
				pending_action?.type === "delete"
					? COLORS.danger
					: COLORS.primary
			}
			icon_background={
				pending_action?.type === "delete" ? "#FFF2F1" : "#F0F9FF"
			}
			onConfirm={handleConfirm}
			onCancel={handleCancel}
		/>
	);
});

export default TaskConfirmationBottomSheet;
