import { COLORS } from "@/constants/Colors";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Text } from "react-native";
import Button from "./Button";
import Icon from "./Icon";

interface ConfirmationBottomSheetProps {
	title: string;
	sub_title: string;
	confirm_button_text: string;
	cancel_button_text?: string;
	confirm_button_bg_color?: string;
	icon_name?: string;
	icon_color?: string;
	icon_background?: string;
	onConfirm: () => void;
	onCancel?: () => void;
}

type Ref = BottomSheetModal;

const ConfirmationBottomSheet = forwardRef<Ref, ConfirmationBottomSheetProps>(
	(
		{
			title,
			sub_title,
			confirm_button_text,
			cancel_button_text = "Cancel",
			confirm_button_bg_color = COLORS.primary,
			icon_name = "alert-circle",
			icon_color = "#F04543",
			icon_background = "#FFF2F1",
			onConfirm,
			onCancel,
		},
		ref
	) => {
		const snap_points = useMemo(() => ["30%"], []);

		const renderBackdrop = useCallback(
			(props: any) => (
				<BottomSheetBackdrop
					{...props}
					disappearsOnIndex={-1}
					appearsOnIndex={0}
				/>
			),
			[]
		);

		return (
			<BottomSheetModal
				ref={ref}
				snapPoints={snap_points}
				index={1}
				backdropComponent={renderBackdrop}>
				<BottomSheetView className="items-center px-7">
					<Icon
						name={icon_name}
						icon_color={icon_color}
						is_circle
						container_color={icon_background}
						icon_size={18}
						size={45}
						style={{ marginTop: 5 }}
					/>

					<Text className="font-bold text-xl mt-2">{title}</Text>
					<Text className="text-base mt-1 text-center">
						{sub_title}
					</Text>

					<Button
						text={confirm_button_text}
						background_color={confirm_button_bg_color}
						text_color={COLORS.white}
						style={{
							borderWidth: 0,
							marginTop: 17,
							paddingVertical: 8,
						}}
						onPress={onConfirm}
					/>

					<Button
						text={cancel_button_text}
						style={{ marginTop: 8, paddingVertical: 8 }}
						onPress={onCancel}
					/>
				</BottomSheetView>
			</BottomSheetModal>
		);
	}
);

export default ConfirmationBottomSheet;
