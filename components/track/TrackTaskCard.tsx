import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { COLORS } from "@/constants/Colors";
import { TrackTask } from "@/entities/TrackTask";
import { useAppStore } from "@/store/appStore";
import Card from "../card/Card";
import CardBody from "../card/CardBody";

interface TrackTaskCardProps {
	task: TrackTask;
	onPress?: (task: TrackTask) => void;
	onMediaPress?: (task: TrackTask) => void;
}

const TrackTaskCard = ({ task, onPress, onMediaPress }: TrackTaskCardProps) => {
	const completeTask = useAppStore((state) => state.completeTask);
	const deleteTask = useAppStore((state) => state.deleteTask);

	const renderRightActions = () => {
		return (
			<View className="bg-primary justify-center items-end flex-1 rounded-lg mb-4 pr-4">
				<FontAwesome6 name="check" size={20} color={COLORS.white} />
			</View>
		);
	};

	const renderLeftActions = () => {
		return (
			<View className="bg-red-700 justify-center items-start flex-1 rounded-lg mb-4 pl-4">
				<FontAwesome6 name="trash" size={20} color={COLORS.white} />
			</View>
		);
	};

	const handleSwipeOpen = (direction: string, taskId: number) => {
		if (direction === "right") {
			completeTask(taskId);
		} else if (direction === "left") {
			deleteTask(taskId);
		}
	};

	return (
		<Swipeable
			renderRightActions={renderRightActions}
			renderLeftActions={renderLeftActions}
			onSwipeableOpen={(direction) => handleSwipeOpen(direction, task.id)}
			containerStyle={{ width: "100%" }}
			rightThreshold={50}>
			<Card
				onPress={() => onPress?.(task)}
				background_color={COLORS.white}
				border_color={COLORS.dark200}>
				<CardBody
					onMediaPress={() => onMediaPress?.(task)}
					category_icon_name={task.category_icon_name}
					task_title={task.task_title}
					task_category_name={task.task_category_name}
					task_time_estimate={task.task_time_estimate}
					media_status_icon={task.media_status_icon}
				/>
			</Card>
		</Swipeable>
	);
};

export default TrackTaskCard;
