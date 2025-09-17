import CustomBottomSheet from "@/components/CustomBottomSheet";
import { COLORS } from "@/constants/Colors";
import { PendingAction } from "@/entities/PendingActionTypes";
import { useAppStore } from "@/store/appStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";

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
		} else if (pending_action.type === "complete") {
			store.completeTask(pending_action.task_id);
		} else if (pending_action.type === "undo") {
			store.undoCompleteTask(pending_action.task_id);
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
			onConfirm={handleConfirm}
			onCancel={handleCancel}
			ref={ref}
			title={
				pending_action?.type === "delete"
					? "Delete Task?"
					: pending_action?.type === "complete"
						? "Mark as Complete?"
						: "Undo Completion?"
			}
			sub_title={
				pending_action?.type === "delete"
					? `You are about to delete "${pending_action?.task_title}".`
					: pending_action?.type === "complete"
						? `Mark "${pending_action?.task_title}" as completed.`
						: `Undo completion of "${pending_action?.task_title}".`
			}
			confirm_button_text={
				pending_action?.type === "delete"
					? "Delete"
					: pending_action?.type === "complete"
						? "Mark Complete"
						: "Undo"
			}
			confirm_button_bg_color={
				pending_action?.type === "delete"
					? COLORS.danger
					: pending_action?.type === "complete"
						? COLORS.primary
						: COLORS.warning
			}
			icon_name={
				pending_action?.type === "delete"
					? "trash-can"
					: pending_action?.type === "complete"
						? "check"
						: "rotate-left"
			}
			icon_color={
				pending_action?.type === "delete"
					? COLORS.danger
					: pending_action?.type === "complete"
						? COLORS.primary
						: COLORS.warning
			}
			icon_background={
				pending_action?.type === "delete"
					? COLORS.danger_light
					: pending_action?.type === "complete"
						? COLORS.primary_light
						: COLORS.warning_light
			}
		/>
	);
});

export default TaskConfirmationBottomSheet;
