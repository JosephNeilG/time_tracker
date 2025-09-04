import React from "react";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";

import DotSeparator from "@/components/DotSeparator";
import OverviewItem from "@/components/OverviewItem";
import { COLORS } from "@/constants/Colors";
import Card from "../card/Card";
import CardHeader from "../card/CardHeader";

interface OverviewItemType {
	id: number;
	title: string | number;
	subtitle: string;
}

interface TasksOverviewCardProps {
	sprint_label: string;
	days_left: number;
	overview_items: OverviewItemType[];
	progress: number;
}

const TasksOverviewCard = ({
	sprint_label,
	days_left,
	overview_items,
	progress,
}: TasksOverviewCardProps) => {
	return (
		<Card border_color="transparent" background_color={COLORS.light400}>
			<CardHeader
				right_text={`${days_left} days left`}
				text_style={{
					color: COLORS.dark100,
					fontSize: 14,
					fontWeight: "500",
				}}>
				<Text className="text-primary text-xl font-semibold">
					{sprint_label}
				</Text>
			</CardHeader>

			<View className="flex-row justify-between items-center mb-3 pr-6">
				{overview_items?.map((item, index) => (
					<View key={item.id} className="flex-row items-center">
						{index !== 0 && <DotSeparator />}

						<OverviewItem
							title={item.title}
							subtitle={item.subtitle}
							style={{
								marginLeft: index !== 0 ? 10 : 0,
							}}
						/>
					</View>
				))}
			</View>

			<Progress.Bar
				progress={progress}
				width={null}
				color={COLORS.primary}
				unfilledColor="#E6E7EB"
				borderWidth={0}
				height={8}
			/>
		</Card>
	);
};

export default TasksOverviewCard;
