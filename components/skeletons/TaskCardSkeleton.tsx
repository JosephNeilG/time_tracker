import { COLORS } from "@/constants/Colors";
import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

const TaskCardSkeleton = () => (
	<ContentLoader
		speed={1.4}
		width="100%"
		height={120}
		viewBox="0 0 400 120"
		backgroundColor={COLORS.light300}
		foregroundColor={COLORS.light400}>
		<Rect x="15" y="10" rx="4" ry="4" width="60" height="18" />
		<Rect x={400 - 80 - 15} y="10" rx="4" ry="4" width="80" height="10" />

		<Rect x="15" y="40" rx="6" ry="6" width="50" height="50" />
		<Rect x="80" y="48" rx="4" ry="4" width="200" height="14" />
		<Rect x="80" y="73" rx="4" ry="4" width="120" height="10" />
		<Circle cx={400 - 20 - 15} cy="63" r="20" />
	</ContentLoader>
);

export default TaskCardSkeleton;
