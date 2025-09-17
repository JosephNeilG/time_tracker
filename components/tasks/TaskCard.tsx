import React, { useRef } from "react";

import Badge from "@/components/Badge";
import Card from "@/components/card/Card";
import CardBody from "@/components/card/CardBody";
import CardHeader from "@/components/card/CardHeader";
import { COLORS } from "@/constants/Colors";
import { Task } from "@/entities/Task";
import { formatSecondsToHoursMinutes } from "@/helpers/timeHelper";
import { TASK_STATUS_STYLES } from "@/stylesheets/TaskStatusStyles";
import { FontAwesome6 } from "@expo/vector-icons";
import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface TaskCardProps {
	task: Task;
	onPress?: (task: Task) => void;
	onMediaPress?: (task: Task) => void;
	onSwipeRequest?: (
		action: "complete" | "delete" | "undo",
		task_id: number
	) => void;
}

const TaskCard = ({
	task,
	onPress,
	onMediaPress,
	onSwipeRequest,
}: TaskCardProps) => {
	const styles = TASK_STATUS_STYLES[task.status];
	let right_text = task.right_text;
	const swipeable_ref = useRef<any>(null);

	if (task.status === "tracking") {
		right_text = String(task.time_stamp);
	} else if (task.status === "completed") {
		right_text = `${formatSecondsToHoursMinutes(task.time_elapsed || 0)} logged`;
	}

	const renderRightActions = () => {
		const is_completed = task.status === "completed";

		return (
			<View
				className={`${is_completed ? "bg-warning" : "bg-primary"} justify-center items-end flex-1 rounded-lg mb-4 pr-4`}>
				<FontAwesome6
					name={is_completed ? "rotate-left" : "check"}
					size={20}
					color={COLORS.white}
				/>
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
			if (task.status === "completed") {
				onSwipeRequest?.("undo", task.id);
			} else {
				onSwipeRequest?.("complete", task.id);
			}
		} else if (direction === "left") {
			onSwipeRequest?.("delete", task.id);
		}
	};

	return (
		<Swipeable
			onSwipeableOpen={(direction) => handleSwipeOpen(direction)}
			renderRightActions={renderRightActions}
			renderLeftActions={renderLeftActions}
			ref={swipeable_ref}
			containerStyle={{ width: "100%" }}
			rightThreshold={50}>
			<Card
				onPress={() => onPress?.(task)}
				background_color={styles.background_color}
				border_color={styles.border_color}>
				<CardHeader
					right_text={right_text}
					text_color={styles.card_text_color}>
					<Badge
						text={styles.badge.text}
						background_color={styles.badge.bg}
						text_color={styles.badge.color}
					/>
				</CardHeader>

				<CardBody
					onMediaPress={() => onMediaPress?.(task)}
					category_icon_name={task.icon_name || "code"}
					task_title={task.title}
					task_category_name={task.category}
					task_time_estimate={task.time_estimate}
					media_status_icon={task.media_icon}
					title_color={styles.title_color}
					subtitle_color={styles.subtitle_color}
					title_decoration={styles.title_decoration}
					category_icon_background={styles.category_icon_background}
					media_status_icon_border_color={
						styles.media_status_icon?.border_color
					}
					media_status_icon_bg_color={
						styles.media_status_icon?.bg_color
					}
					media_status_icon_color={styles.media_status_icon?.color}
				/>
			</Card>
		</Swipeable>
	);
};

export default TaskCard;
