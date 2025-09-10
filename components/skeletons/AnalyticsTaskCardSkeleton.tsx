import React from "react";

import { COLORS } from "@/constants/Colors";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

const AnalyticsTaskCardSkeleton = () => (
	<ContentLoader
		speed={1.4}
		width="100%"
		height={80}
		viewBox="0 0 400 80"
		backgroundColor={COLORS.light300}
		foregroundColor={COLORS.light400}>
		<Circle cx="25" cy="40" r="7" />

		<Rect x="50" y="23" rx="4" ry="4" width="200" height="14" />
		<Rect x={400 - 50 - 15} y="23" rx="4" ry="4" width="50" height="14" />

		<Rect x="50" y="48" rx="4" ry="4" width="120" height="10" />
		<Rect x={400 - 25 - 15} y="48" rx="4" ry="4" width="25" height="10" />
	</ContentLoader>
);

export default AnalyticsTaskCardSkeleton;
