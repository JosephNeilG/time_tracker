import React from "react";

import { COLORS } from "@/constants/Colors";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";

const TrackTaskCardSkeleton = () => (
	<ContentLoader
		speed={1.4}
		width="100%"
		height={80}
		viewBox="0 0 400 80"
		backgroundColor={COLORS.light300}
		foregroundColor={COLORS.light400}>
		<Rect x="15" y="15" rx="6" ry="6" width="50" height="50" />

		<Rect x="80" y="23" rx="4" ry="4" width="200" height="14" />
		<Rect x="80" y="48" rx="4" ry="4" width="120" height="10" />

		<Circle cx={400 - 20 - 15} cy="40" r="20" />
	</ContentLoader>
);

export default TrackTaskCardSkeleton;
