import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";

import Card from "@/components/card/Card";
import CardHeader from "@/components/card/CardHeader";
import DotSeparator from "@/components/DotSeparator";
import FloatingActionButton from "@/components/FloatingActionButton";
import MenuBar from "@/components/MenuBar";
import OverviewItem from "@/components/OverviewItem";
import TaskCard from "@/components/tasks/TaskCard";
import { COLORS } from "@/constants/Colors";
import { QUICK_TASK_DETAILS } from "@/constants/tasks/QuickTaskDetails";
import { TASKS_MENU_ITEMS } from "@/constants/tasks/TasksMenuItems";
import useTaskOverviewItems from "@/hooks/useTaskOverviewItems";
import useTasks from "@/hooks/useTasks";
import EmptyTaskView from "../components/tasks/EmptyTaskView";

const TasksScreen = () => {
	const [has_tasks, setHasTasks] = useState(false);
	const router = useRouter();
	const { data: tasks, is_loading, error } = useTasks();
	const {
		data: overview_items,
		is_loading: overview_is_loading,
		error: overview_error,
	} = useTaskOverviewItems();

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

								{overview_is_loading && <ActivityIndicator />}
								{overview_error && (
									<Text className="text-red-800">
										Error: {overview_error.message}
									</Text>
								)}

								<View className="flex-row justify-between items-center mb-3 pr-6">
									{overview_items?.map((item, index) => (
										<View
											key={item.id}
											className="flex-row items-center">
											{index !== 0 && <DotSeparator />}

											<OverviewItem
												title={item.title}
												subtitle={item.subtitle}
												style={{
													marginLeft:
														index !== 0 ? 10 : 0,
												}}
											/>
										</View>
									))}
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

							{is_loading && <ActivityIndicator size="large" />}

							{error && (
								<Text className="text-red-800">
									Error: {error.message}
								</Text>
							)}

							{tasks?.map((task) => (
								<TaskCard
									key={task.id}
									task={task}
									onPress={handleCardOnPress}
								/>
							))}
						</>
					) : (
						<EmptyTaskView onSync={() => setHasTasks(true)} />
					)}
				</View>
			</ScrollView>

			{has_tasks && <FloatingActionButton onPress={handleFABOnPress} />}
		</View>
	);
};

export default TasksScreen;
