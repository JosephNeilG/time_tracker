import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
	forwardRef,
	RefObject,
	useCallback,
	useMemo,
	useRef,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { COLORS } from "@/constants/Colors";
import {
	CATEGORY_OPTIONS,
	HOUR_OPTIONS,
	PRIORITY_OPTIONS,
} from "@/constants/tasks/AddTaskDropdownOptions";
import { AddTaskFormValues, AddTaskSchema } from "@/schema/addTaskSchema";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import Icon from "../Icon";
import AppDropdown from "../forms/AppDropDown";
import FormTabs from "../forms/FormTabs";
import AppTextInput from "../forms/TextInput";

const AddTaskBottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
	const snap_points = useMemo(() => ["80%", "90%"], []);
	const title_input_ref = useRef<TextInput>(null);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddTaskFormValues>({
		resolver: zodResolver(AddTaskSchema),
		mode: "onChange",
		defaultValues: {
			title: "",
			category: "",
			time_estimate: 0,
			priority: "low",
		},
	});

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

	const handleDismissSheet = () => {
		(ref as RefObject<BottomSheetModal>)?.current.dismiss();
		Keyboard.dismiss();
	};

	const handleSubmitForm = (data: AddTaskFormValues) => {
		console.log("Task added:", data);

		reset();
		handleDismissSheet();
	};

	return (
		<BottomSheetModal
			ref={ref}
			snapPoints={snap_points}
			index={1}
			backdropComponent={renderBackdrop}
			onChange={(index) => {
				if (index >= 0) {
					title_input_ref.current?.focus();
				}
			}}>
			<BottomSheetView className="px-7 pt-2 pb-[40px] flex-1">
				<View className="flex-row justify-between items-center mb-6">
					<Text className="text-2xl font-semibold">
						Create new task
					</Text>
					<TouchableOpacity onPress={handleDismissSheet}>
						<Icon
							is_circle
							name="xmark"
							icon_color={COLORS.dark600}
							container_color={COLORS.light100}
							icon_size={18}
							size={35}
						/>
					</TouchableOpacity>
				</View>

				<Controller
					control={control}
					name="title"
					render={({ field: { onChange, value } }) => (
						<>
							<AppTextInput
								label="Title"
								placeholder="Enter task title"
								value={value}
								onChangeText={onChange}
								ref={title_input_ref}
							/>
							<ErrorMessage message={errors.title?.message} />
						</>
					)}
				/>

				<View className="flex-row gap-3 my-1">
					<View style={{ flex: 2 }}>
						<Controller
							control={control}
							name="category"
							render={({ field: { onChange, value } }) => (
								<>
									<AppDropdown
										label="Category"
										data={CATEGORY_OPTIONS}
										value={value}
										onChange={onChange}
									/>
									<ErrorMessage
										message={errors.category?.message}
									/>
								</>
							)}
						/>
					</View>

					<View style={{ flex: 1 }}>
						<Controller
							control={control}
							name="time_estimate"
							render={({ field: { onChange, value } }) => (
								<>
									<AppDropdown
										label="Time Estimate"
										data={HOUR_OPTIONS}
										value={value}
										onChange={onChange}
									/>
									<ErrorMessage
										message={errors.time_estimate?.message}
									/>
								</>
							)}
						/>
					</View>
				</View>

				<Controller
					control={control}
					name="priority"
					render={({ field: { onChange, value } }) => (
						<>
							<FormTabs
								label="Priority"
								tabs={PRIORITY_OPTIONS}
								onTabSelect={(index) =>
									onChange(PRIORITY_OPTIONS[index].value)
								}
							/>
							<ErrorMessage message={errors.priority?.message} />
						</>
					)}
				/>

				<Button
					onPress={handleSubmit(handleSubmitForm)}
					text="Create"
					background_color={COLORS.primary}
					text_color={COLORS.white}
					style={{ borderWidth: 0, marginTop: 20 }}
				/>
			</BottomSheetView>
		</BottomSheetModal>
	);
});

export default AddTaskBottomSheet;
