import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import * as Progress from "react-native-progress";

import Badge from "@/components/Badge";
import Card from "@/components/card/Card";
import CardBody from "@/components/card/CardBody";
import CardHeader from "@/components/card/CardHeader";
import DotSeparator from "@/components/DotSeparator";
import Icon from "@/components/Icon";
import MenuBar from "@/components/MenuBar";
import TaskOverviewItem from "@/components/TaskOverviewItem";
import { COLORS } from "@/constants/Colors";
import { QUICK_TASK_DETAILS } from "@/constants/QuickTaskDetails";
import { TASKS } from "@/constants/Tasks";
import { TASKS_MENU_ITEMS } from "@/constants/TasksMenuItems";
import { TASK_STATUS_STYLES } from "@/stylesheets/TaskStatusStyles";
import EmptyTaskView from "../components/tasks/EmptyTaskView";

const TasksScreen = () => {
	const [has_tasks, setHasTasks] = useState(false);
	const router = useRouter();

	const handleFABOnPress = () => {
		router.navigate({
			pathname: "/",
			params: QUICK_TASK_DETAILS,
		});
	};

	const handleCardOnPress = () => {
		router.navigate("/");
	};

	return (
		<View className="flex-1">
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="p-7 items-center w-full">
					{has_tasks ? (
						<>
							<Card
								border_color="transparent"
								background_color={COLORS.light400}>
								<CardHeader
									right_text="8 days left"
									text_style={{
										color: COLORS.dark100,
										fontSize: 14,
										fontWeight: 500,
									}}>
									<Text className="text-primary text-xl font-semibold">
										Sprint 2025-01
									</Text>
								</CardHeader>
								<View className="flex-row justify-between items-center mb-3 pr-6">
									<TaskOverviewItem
										title="12 tasks"
										subtitle="assigned"
									/>

									<View className="flex-row items-center">
										<DotSeparator />

										<TaskOverviewItem
											title={5}
											subtitle="completed"
											style={{ marginLeft: 10 }}
										/>
									</View>

									<View className="flex-row items-center">
										<DotSeparator />

										<TaskOverviewItem
											title="42h"
											subtitle="logged"
											style={{ marginLeft: 10 }}
										/>
									</View>
								</View>
								<Progress.Bar
									progress={0.56}
									width={null}
									color={COLORS.primary}
									unfilledColor="#E6E7EB"
									borderWidth={0}
									height={8}
								/>
							</Card>

							<MenuBar
								tabs={TASKS_MENU_ITEMS}
								initial_index={0}
							/>

							{TASKS.map((task) => {
								const config = TASK_STATUS_STYLES[task.status];

								return (
									<Card
										key={task.id}
										background_color={
											config.background_color
										}
										border_color={config.border_color}
										onPress={
											task.status === "tracking"
												? handleCardOnPress
												: undefined
										}>
										<CardHeader
											right_text={task.right_text}
											text_color={config.card_text_color}>
											<Badge
												text={config.badge.text}
												background_color={
													config.badge.bg
												}
												text_color={config.badge.color}
											/>
										</CardHeader>

										<CardBody
											category_icon_name={
												task.icon_name || "code"
											}
											task_title={task.title}
											task_category_name={task.category}
											task_time_estimate={
												task.time_estimate
											}
											media_status_icon={task.media_icon}
											title_color={config.title_color}
											subtitle_color={
												config.subtitle_color
											}
											title_decoration={
												config.title_decoration
											}
											category_icon_background={
												config.category_icon_background
											}
											media_status_icon_border_color={
												config.media_status_icon
													?.border_color
											}
											media_status_icon_bg_color={
												config.media_status_icon
													?.bg_color
											}
											media_status_icon_color={
												config.media_status_icon?.color
											}
										/>
									</Card>
								);
							})}
						</>
					) : (
						<EmptyTaskView onSync={() => setHasTasks(true)} />
					)}
				</View>
			</ScrollView>

			{has_tasks && (
				<TouchableOpacity onPress={handleFABOnPress}>
					<Icon
						name="bolt"
						IconSet={FontAwesome6}
						is_circle
						size={60}
						icon_size={20}
						style={styles.fab}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});

export default TasksScreen;
