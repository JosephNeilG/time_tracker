import { TrackTasks } from "@/entities/TrackTaskInterface";
import React from "react";
import Card from "../card/Card";
import CardBody from "../card/CardBody";

interface TrackTaskCardProps {
	task: TrackTasks;
}

const TrackTaskCard = ({ task }: TrackTaskCardProps) => {
	return (
		<Card>
			<CardBody
				category_icon_name={task.category_icon_name}
				task_title={task.task_title}
				task_category_name={task.task_category_name}
				task_time_estimate={task.task_time_estimate}
				media_status_icon={task.media_status_icon}
			/>
		</Card>
	);
};

export default TrackTaskCard;
