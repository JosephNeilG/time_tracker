import React from "react";
import { View } from "react-native";

import { COLORS } from "@/constants/Colors";
import OverviewItem from "../OverviewItem";
import Card from "../card/Card";

interface OverviewItemType {
	id: number;
	title: string | number;
	subtitle: string;
	title_size?: number;
}

interface AnalyticsOverviewCardProps {
	overview_items: OverviewItemType[];
	progress?: number;
}

const AnalyticsOverviewCard = ({
	overview_items,
}: AnalyticsOverviewCardProps) => {
	return (
		<Card border_color="transparent" background_color={COLORS.light400}>
			<View className="flex-row justify-between items-center px-3">
				{overview_items?.map((item) => (
					<OverviewItem
						key={item.id}
						title={item.title}
						subtitle={item.subtitle}
						title_size={26}
						title_color={COLORS.primary}
						align="center"
					/>
				))}
			</View>
		</Card>
	);
};

export default AnalyticsOverviewCard;
