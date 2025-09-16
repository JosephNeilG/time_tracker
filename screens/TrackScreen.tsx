/*
 * DOCU: Main screen of the time tracker app
 * Displays the current actve task, progress tracking controls,
 * and the list of up next tasks.
 */

import { FontAwesome6 } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

import Card from "@/components/card/Card";
import DotSeparator from "@/components/DotSeparator";
import EmptyTaskListText from "@/components/EmptyTaskListText";
import EmptyTaskView from "@/components/EmptyTaskView";
import Icon from "@/components/Icon";
import SearchBar from "@/components/SearchBar";
import TrackTaskCardSkeleton from "@/components/skeletons/TrackTaskCardSkeleton";
import TaskConfirmationBottomSheet from "@/components/track/TasksConfirmationBottomSheet";
import TrackTaskCard from "@/components/track/TrackTaskCard";
import { COLORS } from "@/constants/Colors";
import { EMPTY_PLAYER_PLACEHOLDER } from "@/constants/EmptyPlayerPlaceholder";
import { SKELETONS } from "@/constants/Skeletons";
import { TrackTask } from "@/entities/TrackTask";
import { getSprintLabel } from "@/helpers/dateHelper";
import { toTrackTask } from "@/helpers/taskToTrackTaskHelper";
import { useAppStore } from "@/store/appStore";

/**
 * DOCU: TrackScreen - Displays task player with playback controls
 * (play, pause, next, previous) and list of upcoming tasks
 */
const TrackScreen = () => {
	const sprint_label = getSprintLabel();
	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const syncTasks = useAppStore((state) => state.syncTasks);
	const tasks = useAppStore((state) => state.tasks);
	const current_task_id = useAppStore((state) => state.current_task_id);
	const current_task = tasks.find((t) => t.id === current_task_id) || null;
	const all_tasks = tasks.filter((task) => task.status !== "completed");
	const task = current_task ?? EMPTY_PLAYER_PLACEHOLDER;
	const [search_query, setSearchQuery] = useState<string>("");

	const [pending_action, setPendingAction] = useState<{
		type: "delete" | "complete";
		task_id: number;
		task_title: string;
	} | null>(null);

	const bottom_sheet_ref = useRef<BottomSheetModal>(null);

	const handleSwipeRequest = (
		action: "delete" | "complete",
		task_id: number
	) => {
		const swiped_task = tasks.find((task) => task.id === task_id);

		setPendingAction({
			type: action,
			task_id,
			task_title: swiped_task?.title ?? "this task",
		});
		bottom_sheet_ref.current?.present();
	};

	/**
	 * DOCU: Ensures current task appears first, followed by next tasks,
	 * then previous tasks.
	 */
	const ordered_tasks = useMemo(() => {
		if (!current_task) return all_tasks;

		const current_index = all_tasks.findIndex(
			(task) => task.id === current_task.id
		);

		if (current_index === -1) return all_tasks;

		const from_current = all_tasks.slice(current_index);
		const before_current = all_tasks.slice(0, current_index);

		return [...from_current, ...before_current];
	}, [all_tasks, current_task]);

	/** DOCU: Converts ordered tasks into TrackTask format */
	const display_next_tasks = ordered_tasks.map((task) => ({
		id: task.id,
		category_icon_name: task.icon_name,
		task_title: task.title,
		task_category_name: task.category,
		task_time_estimate: task.time_estimate,
		media_status_icon: task.media_icon,
	}));

	/**
	 * DOCU: Filters "Up Next" tasks based on search query.
	 * If search query is empty, all tasks are displayed.
	 */
	const filtered_display_next_tasks = useMemo(() => {
		if (search_query.trim() === "") return display_next_tasks;

		return display_next_tasks.filter((task) =>
			task.task_title.toLowerCase().includes(search_query.toLowerCase())
		);
	}, [display_next_tasks, search_query]);

	/**
	 * DOCU: Handle card press to set the selected task as current
	 * and toggle its play/ pause state
	 * @param task: The task to play
	 */
	const handleOnPress = (task: TrackTask) => {
		const store = useAppStore.getState();
		store.toggleCardPlayerIcon(task.id);
		store.setCurrentTask(task.id);
	};

	/**
	 * DOCU: Gets the index of the current task in the task list
	 * Returns -1 if no task is active
	 * @returns
	 */
	const getCurrentIndex = () => {
		if (current_task) {
			return all_tasks.findIndex((task) => task.id === current_task.id);
		} else {
			return -1;
		}
	};

	/**
	 * DOCU: Navigates to the next task in the list
	 * Uses modulo math to wrap around
	 */
	const handleNextTask = () => {
		const index = getCurrentIndex();

		if (index >= 0) {
			const next_index = (index + 1) % all_tasks.length;
			const next_task = all_tasks[next_index];

			handleOnPress(toTrackTask(next_task));
		}
	};

	/** DOCU: Navigates to the previous task in the list */
	const handlePrevTask = () => {
		const index = getCurrentIndex();

		if (index >= 0) {
			const prev_index =
				(index - 1 + all_tasks.length) % all_tasks.length;
			const prev_task = all_tasks[prev_index];

			handleOnPress(toTrackTask(prev_task));
		}
	};

	/** DOCU: Toggles play/ pause state of the current task */
	const handleCardPlayerOnPress = () => {
		if (current_task) {
			const store = useAppStore.getState();
			store.toggleCardPlayerIcon(current_task.id);
			store.setCurrentTask(current_task.id);
		}
	};

	const is_task_list_empty = display_next_tasks.length === 0;

	const playPauseStyle = current_task ? "opacity-100" : "opacity-70";

	const active_tasks = all_tasks.filter(
		(task) => task.status === "todo" || task.status === "tracking"
	);
	const is_last_task = active_tasks.length <= 1;
	const prevNextDisabledStyle =
		!current_task || is_last_task ? "opacity-70" : "opacity-100";

	return (
		<View style={{ flex: 1 }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="p-7 items-center w-full mb-[70px]">
					{is_tasks_synced ? (
						<>
							<SearchBar
								container_style={{
									marginBottom: 0,
								}}
								value={search_query}
								onChangeText={setSearchQuery}
							/>
							<Card
								border_color="transparent"
								background_color={COLORS.light400}
								style={{
									alignItems: "center",
									paddingVertical: 25,
									marginTop: 15,
								}}>
								<Icon
									name={task.icon_name as string}
									IconSet={FontAwesome6}
									container_color={
										current_task
											? COLORS.primary
											: COLORS.light300
									}
									size={130}
								/>

								<View className="items-center my-5">
									<Text className="text-dark-500 text-2xl font-medium mb-2">
										{task.title}
									</Text>
									<View className="flex-row flex-wrap justify-center items-center gap-1">
										<Text className="text-secondary text-base font-medium leading-6">
											{task.description || sprint_label}
										</Text>
										<DotSeparator
											color={COLORS.secondary}
											size={3.5}
										/>
										<Text className="text-secondary text-base font-medium leading-6">
											{task.category}
										</Text>
									</View>
								</View>

								<View className="w-full">
									<Progress.Bar
										progress={task.progress_count}
										width={null}
										color={COLORS.primary}
										unfilledColor="#E6E7EB"
										borderWidth={0}
										height={8}
									/>
								</View>

								<Text className="text-dark-500 text-4xl font-medium mt-5 mb-6">
									{task.time_stamp}
								</Text>

								<View className="flex-row gap-6 items-center">
									<TouchableOpacity
										disabled={!current_task || is_last_task}
										className={prevNextDisabledStyle}
										onPress={handlePrevTask}>
										<Icon
											name="backward"
											IconSet={FontAwesome6}
											is_circle
											size={50}
											icon_size={17}
											icon_color={COLORS.dark500}
											container_color="transparent"
											border_color={COLORS.dark200}
											border_width={1}
										/>
									</TouchableOpacity>

									<TouchableOpacity
										disabled={!current_task}
										className={playPauseStyle}
										onPress={handleCardPlayerOnPress}>
										<Icon
											name={
												current_task?.media_icon ||
												task.media_icon
											}
											IconSet={FontAwesome6}
											is_circle
											size={70}
											icon_size={22}
										/>
									</TouchableOpacity>

									<TouchableOpacity
										disabled={!current_task || is_last_task}
										className={prevNextDisabledStyle}
										onPress={handleNextTask}>
										<Icon
											name="forward"
											IconSet={FontAwesome6}
											is_circle
											size={50}
											icon_size={17}
											icon_color={COLORS.dark500}
											container_color="transparent"
											border_color={COLORS.dark200}
											border_width={1}
										/>
									</TouchableOpacity>
								</View>
							</Card>

							<View className="flex-row justify-between items-center w-full mb-5 mt-1">
								<Text className="text-dark-500 text-2xl font-medium">
									Up Next
								</Text>
							</View>

							{is_loading_tasks ? (
								SKELETONS.map((index) => (
									<TrackTaskCardSkeleton key={index} />
								))
							) : is_task_list_empty ? (
								<EmptyTaskListText list_name="Up Next" />
							) : (
								filtered_display_next_tasks.map((task) => (
									<TrackTaskCard
										key={task.id}
										task={task}
										onPress={handleOnPress}
										onMediaPress={handleOnPress}
										onSwipeRequest={handleSwipeRequest}
									/>
								))
							)}
						</>
					) : (
						<EmptyTaskView onSync={syncTasks} />
					)}
				</View>
			</ScrollView>

			{is_tasks_synced && (
				<TaskConfirmationBottomSheet
					ref={bottom_sheet_ref}
					pending_action={pending_action}
					setPendingAction={setPendingAction}
				/>
			)}
		</View>
	);
};

export default TrackScreen;
