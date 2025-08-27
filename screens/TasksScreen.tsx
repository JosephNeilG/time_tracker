import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";

import Badge from "@/components/Badge";
import Card from "@/components/card/Card";
import CardBody from "@/components/card/CardBody";
import CardHeader from "@/components/card/CardHeader";
import DotSeparator from "@/components/DotSeparator";
import MenuBar from "@/components/MenuBar";
import TaskOverviewItem from "@/components/TaskOverviewItem";
import { COLORS } from "@/constants/Colors";
import NoTask from "./NoTask";

const TasksScreen = () => {
	const [hasTasks, setHasTasks] = useState(false);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className="p-7 items-center w-full">
				{hasTasks ? (
					<>
						<Card
							borderColor="transparent"
							background_color={COLORS.light400}>
							<CardHeader
								right_text="8 days left"
								textStyle={{
									color: COLORS.dark100,
									fontSize: 14,
									fontWeight: 500,
								}}>
								<Text className="text-primary text-xl font-semibold">
									Sprint 2025-01
								</Text>
							</CardHeader>
							<View className="flex-row justify-between items-center mb-3">
								<TaskOverviewItem
									value="12 tasks"
									label="assigned"
								/>

								<DotSeparator />

								<TaskOverviewItem
									value={5}
									label="completed"
									style={{ marginLeft: 10 }}
								/>

								<DotSeparator />

								<TaskOverviewItem
									value="42h"
									label="logged"
									style={{ marginLeft: 10 }}
								/>
							</View>
							<Progress.Bar
								progress={0.56}
								width={null}
								color={COLORS.primary}
								unfilledColor="#E6E7EB"
								borderWidth={0}
								height={8}
							/>
						</Card>

						<MenuBar
							tabs={[
								{ label: "All" },
								{ label: "In Progress" },
								{ label: "Completed" },
							]}
							initial_index={0}
							onTabPress={(index) =>
								console.log("Selected tab:", index)
							}
						/>

						<Card background_color={COLORS.primary}>
							<CardHeader
								right_text="02:34:15"
								text_color={COLORS.white}>
								<Badge
									text="TRACKING NOW"
									background_color={COLORS.dark100}
								/>
							</CardHeader>
							<CardBody
								category_icon_name="code"
								category_icon_background={COLORS.dark100}
								task_title="API Integration Setup"
								title_color={COLORS.light100}
								subtitle_color={COLORS.light300}
								task_category_name="Frontend Development"
								task_time_estimate="6h estimated"
								media_status_icon="pause"
								media_status_icon_color={COLORS.light100}
								media_status_icon_bg_color={COLORS.dark100}
								media_status_icon_border_color="transparent"
							/>
						</Card>

						<Card>
							<CardHeader right_text="High Priority">
								<Badge
									text="TO DO"
									text_color={COLORS.secondary}
								/>
							</CardHeader>
							<CardBody
								category_icon_name="database"
								task_title="Database Migration"
								task_category_name="Backend"
								task_time_estimate="4h estimated"
								media_status_icon="play"
							/>
						</Card>

						<Card>
							<CardHeader right_text="Medium Priority">
								<Badge
									text="TO DO"
									text_color={COLORS.secondary}
								/>
							</CardHeader>
							<CardBody
								category_icon_name="mobile-screen-button"
								task_title="Mobile UI Testing"
								task_category_name="QA"
								task_time_estimate="2h estimated"
							/>
						</Card>

						<Card>
							<CardHeader right_text="Low Priority">
								<Badge
									text="TO DO"
									text_color={COLORS.secondary}
								/>
							</CardHeader>
							<CardBody
								category_icon_name="mobile-screen-button"
								task_title="Analytics Dashboard"
								task_category_name="Frontend"
								task_time_estimate="6h estimated"
							/>
						</Card>

						<Card>
							<CardHeader right_text="3.5h logged">
								<Badge
									text="Completed"
									text_color={COLORS.secondary}
								/>
							</CardHeader>
							<CardBody
								category_icon_name="users"
								task_title="User Authentication"
								task_category_name="Backend"
								task_time_estimate="4h estimated"
								media_status_icon="check"
								title_decoration="line-through"
								media_status_icon_border_color="transparent"
							/>
						</Card>
					</>
				) : (
					<NoTask onSync={() => setHasTasks(true)} />
				)}
			</View>
		</ScrollView>
	);
};

export default TasksScreen;
