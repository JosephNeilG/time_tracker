import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import * as Progress from "react-native-progress";

import Card from "@/components/card/Card";
import DotSeparator from "@/components/DotSeparator";
import EmptyTaskView from "@/components/EmptyTaskView";
import Icon from "@/components/Icon";
import TrackTaskCard from "@/components/track/TrackTaskCard";
import { COLORS } from "@/constants/Colors";
import { EMPTY_PLAYER_PLACEHOLDER } from "@/constants/EmptyPlayerPlaceholder";
import { TrackTask } from "@/entities/TrackTask";
import { getSprintLabel } from "@/helpers/dateHelper";
import { useAppStore } from "@/store/appStore";

const TrackScreen = () => {
	const sprint_label = getSprintLabel();

	const is_loading_tasks = useAppStore((state) => state.is_loading_tasks);
	const is_tasks_synced = useAppStore((state) => state.is_tasks_synced);
	const tasks = useAppStore((state) => state.tasks);
	const syncTasks = useAppStore((state) => state.syncTasks);
	const current_task = useAppStore((state) => state.current_task);

	const track_tasks = tasks
		.filter(
			(task) => task.status !== "completed" && task.status !== "tracking"
		)
		.map((task) => ({
			id: task.id,
			category_icon_name: task.icon_name,
			task_title: task.title,
			task_category_name: task.category,
			task_time_estimate: task.time_estimate,
			media_status_icon: task.media_icon,
		}));

	const task = current_task ?? EMPTY_PLAYER_PLACEHOLDER;

	const handleOnPress = (task: TrackTask) => {
		const store = useAppStore.getState();

		store.toggleCardPlayerIcon(task.id);
		store.setCurrentTask(tasks.find((t) => t.id === task.id)!);
	};

	const disabledStyle = current_task ? "opacity-100" : "opacity-70";

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className="p-7 items-center w-full">
				{is_tasks_synced ? (
					<>
						<Card
							border_color="transparent"
							background_color={COLORS.light400}
							style={{
								alignItems: "center",
								paddingVertical: 25,
							}}>
							<Icon
								name={(task.icon_name as string) || "code"}
								IconSet={FontAwesome6}
								container_color={COLORS.dark300}
								size={130}
							/>

							<View className="items-center my-5">
								<Text className="text-primary text-2xl font-medium mb-2">
									{task.title || "Task"}
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
										{task.category || "Category"}
									</Text>
								</View>
							</View>

							<View className="w-full">
								<Progress.Bar
									progress={task.progress_count || 0}
									width={null}
									color={COLORS.primary}
									unfilledColor="#E6E7EB"
									borderWidth={0}
									height={8}
								/>
							</View>

							<Text className="text-primary text-4xl font-medium mt-5 mb-6">
								{task.time_stamp || "00:00:00"}
							</Text>

							<View className="flex-row gap-6 items-center">
								<TouchableOpacity
									disabled={!current_task}
									className={disabledStyle}>
									<Icon
										name="backward"
										IconSet={FontAwesome6}
										is_circle
										size={50}
										icon_size={17}
										icon_color={COLORS.primary}
										container_color="transparent"
										border_color={COLORS.dark200}
										border_width={0.5}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									disabled={!current_task}
									className={disabledStyle}>
									<Icon
										name="play"
										IconSet={FontAwesome6}
										is_circle
										size={70}
										icon_size={22}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									disabled={!current_task}
									className={disabledStyle}>
									<Icon
										name="forward"
										IconSet={FontAwesome6}
										is_circle
										size={50}
										icon_size={17}
										icon_color={COLORS.primary}
										container_color="transparent"
										border_color={COLORS.dark200}
										border_width={0.5}
									/>
								</TouchableOpacity>
							</View>
						</Card>

						<View className="flex-row justify-between items-center w-full mb-5 mt-1">
							<Text className="text-primary text-2xl font-medium">
								Up Next
							</Text>
							{/* <TouchableOpacity className="flex-row items-center gap-2">
								<FontAwesome6
									name="shuffle"
									size={16}
									color={COLORS.dark100}
								/>
								<Text className="text-dark-100 text-lg font-medium leading-6">
									Shuffle
								</Text>
							</TouchableOpacity> */}
						</View>

						{is_loading_tasks ? (
							<ActivityIndicator size="large" />
						) : (
							track_tasks.map((task) => (
								<TrackTaskCard
									key={task.id}
									task={task}
									onPress={handleOnPress}
									onMediaPress={handleOnPress}
								/>
							))
						)}
					</>
				) : (
					<EmptyTaskView onSync={syncTasks} />
				)}
			</View>
		</ScrollView>
	);
};

export default TrackScreen;
