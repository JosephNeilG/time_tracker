import React from "react";

import Badge from "@/components/Badge";
import Card from "@/components/card/Card";
import CardBody from "@/components/card/CardBody";
import CardHeader from "@/components/card/CardHeader";
import { Task } from "@/entities/Task";
import { TASK_STATUS_STYLES } from "@/stylesheets/TaskStatusStyles";

interface TaskCardProps {
	task: Task;
	onPress?: (task: Task) => void;
}

const TaskCard = ({ task, onPress }: TaskCardProps) => {
	const styles = TASK_STATUS_STYLES[task.status];

	return (
		<Card
			background_color={styles.background_color}
			border_color={styles.border_color}
			onPress={() => onPress?.(task)}>
			<CardHeader
				right_text={task.right_text}
				text_color={styles.card_text_color}>
				<Badge
					text={styles.badge.text}
					background_color={styles.badge.bg}
					text_color={styles.badge.color}
				/>
			</CardHeader>

			<CardBody
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
				media_status_icon_bg_color={styles.media_status_icon?.bg_color}
				media_status_icon_color={styles.media_status_icon?.color}
			/>
		</Card>
	);
};

export default TaskCard;
