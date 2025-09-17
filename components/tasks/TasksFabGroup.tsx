import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import { COLORS } from "@/constants/Colors";
import createQuickTask from "@/helpers/quickTaskHelper";
import startBreak from "@/helpers/startBreakHelper";
import { useAppStore } from "@/store/appStore";

const TasksFabGroup = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const handleQuickTask = () => {
		const quickTask = createQuickTask();

		useAppStore.setState((state) => {
			const updated_tasks = state.tasks.map((task: any) =>
				task.status === "tracking"
					? { ...task, status: "todo", media_icon: "play" }
					: task
			);

			return {
				tasks: [...updated_tasks, quickTask],
				current_task_id: quickTask.id,
			};
		});

		useAppStore.getState().startTimer(quickTask.id);

		router.navigate("/");
	};

	const handleBreak = () => {
		const break_time = startBreak();

		useAppStore.setState((state: any) => {
			const updated_tasks = state.tasks.map((task: any) =>
				task.status === "tracking"
					? { ...task, status: "todo", media_icon: "play" }
					: task
			);

			return {
				tasks: [...updated_tasks, break_time],
				current_task_id: break_time.id,
			};
		});

		useAppStore.getState().startTimer(break_time.id);

		router.navigate("/");
	};

	const handleStateChange = ({ open }: { open: boolean }) => {
		setOpen(open);
	};

	return (
		<FAB.Group
			open={open}
			visible
			icon={open ? "close" : "plus"}
			color={COLORS.white}
			fabStyle={{
				backgroundColor: open ? COLORS.light200 : COLORS.primary,
			}}
			backdropColor={COLORS.overlay}
			actions={[
				{
					onPress: () => console.log("Add task"),
					icon: "plus",
					label: "Add Task",
					...fab_item_props,
				},
				{
					onPress: handleQuickTask,
					icon: "lightning-bolt",
					label: "Quick Task",
					...fab_item_props,
				},
				{
					onPress: handleBreak,
					icon: "coffee",
					label: "Start Break",
					...fab_item_props,
				},
			]}
			onStateChange={handleStateChange}
			style={styles.main_fab}
		/>
	);
};

const fab_item_props = {
	color: COLORS.white,
	style: { backgroundColor: COLORS.primary },
	size: "medium" as const,
	labelStyle: { color: COLORS.white, marginRight: -15 },
};

const styles = StyleSheet.create({
	main_fab: {
		paddingBottom: 90,
		paddingRight: 9,
	},
});

export default TasksFabGroup;
