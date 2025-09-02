import { TrackTask } from "@/entities/TrackTask";
import React from "react";
import Card from "../card/Card";
import CardBody from "../card/CardBody";

interface TrackTaskCardProps {
	task: TrackTask;
	onPress?: (task: TrackTask) => void;

	onMediaPress?: (task: TrackTask) => void;
}

const TrackTaskCard = ({ task, onPress, onMediaPress }: TrackTaskCardProps) => {
	return (
		<Card onPress={() => onPress?.(task)}>
			<CardBody
				category_icon_name={task.category_icon_name}
				task_title={task.task_title}
				task_category_name={task.task_category_name}
				task_time_estimate={task.task_time_estimate}
				media_status_icon={task.media_status_icon}
				onMediaPress={() => onMediaPress?.(task)}
			/>
		</Card>
	);
};

export default TrackTaskCard;
