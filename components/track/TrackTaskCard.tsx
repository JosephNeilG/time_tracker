import { FontAwesome6 } from "@expo/vector-icons";
import React, { useRef } from "react";
import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { COLORS } from "@/constants/Colors";
import { TrackTask } from "@/entities/TrackTask";
import Card from "../card/Card";
import CardBody from "../card/CardBody";

interface TrackTaskCardProps {
	task: TrackTask;
	onPress?: (task: TrackTask) => void;
	onMediaPress?: (task: TrackTask) => void;
	onSwipeRequest?: (action: "complete" | "delete", task_id: number) => void;
}

const TrackTaskCard = ({
	task,
	onPress,
	onMediaPress,
	onSwipeRequest,
}: TrackTaskCardProps) => {
	const swipeable_ref = useRef<any>(null);

	const renderRightActions = () => {
		return (
			<View className="bg-primary justify-center items-end flex-1 rounded-lg mb-4 pr-4">
				<FontAwesome6 name="check" size={20} color={COLORS.white} />
			</View>
		);
	};

	const renderLeftActions = () => {
		return (
			<View className="bg-danger justify-center items-start flex-1 rounded-lg mb-4 pl-4">
				<FontAwesome6 name="trash" size={20} color={COLORS.white} />
			</View>
		);
	};

	const handleSwipeOpen = (direction: string) => {
		swipeable_ref.current?.close();

		if (direction === "right") {
			onSwipeRequest?.("complete", task.id);
		} else if (direction === "left") {
			onSwipeRequest?.("delete", task.id);
		}
	};

	return (
		<Swipeable
			ref={swipeable_ref}
			renderRightActions={renderRightActions}
			renderLeftActions={renderLeftActions}
			onSwipeableOpen={(direction) => handleSwipeOpen(direction)}
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
