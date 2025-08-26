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
						<View className="p-4 bg-light-100 rounded-lg w-full">
							<View className="flex-row justify-between items-center mb-4">
								<Text className="text-primary text-xl font-semibold">
									Sprint 2025-01
								</Text>
								<Text className="text-dark-100 text-base font-medium">
									8 days left
								</Text>
							</View>
							<View className="flex-row justify-between items-center mb-3">
								<TaskOverviewItem
									value="12 tasks"
									label="Assigned"
								/>

								<DotSeparator />

								<TaskOverviewItem value={5} label="completed" />

								<DotSeparator />

								<TaskOverviewItem value="42h" label="logged" />
							</View>
							<Progress.Bar
								progress={0.56}
								width={null}
								color={COLORS.primary}
								unfilledColor="#E6E7EB"
								borderWidth={0}
								height={8}
							/>
						</View>

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

						<Card backgroundColor={COLORS.primary}>
							<CardHeader
								right_text="02:34:15"
								text_color={COLORS.white}>
								<Badge
									text="TRACKING NOW"
									background_color={COLORS.dark100}
								/>
							</CardHeader>
							<CardBody
								leftIconName="code"
								leftIconBackground={COLORS.dark100}
								title="API Integration Setup"
								titleColor={COLORS.light100}
								subtitleColor={COLORS.light300}
								subtitleLeft="Frontend Development"
								subtitleRight="6h estimated"
								rightIconName="pause"
							/>
						</Card>

						<Card borderWidth={0.5} borderColor={COLORS.secondary}>
							<CardHeader right_text="High Priority">
								<Badge
									text="TO DO"
									text_color={COLORS.secondary}
								/>
							</CardHeader>
							<CardBody
								leftIconName="database"
								title="Database Migration"
								subtitleLeft="Backend"
								subtitleRight="4h estimated"
								rightIconName="pause"
								rightIconBackground={COLORS.primary}
								rightIconBorderWidth={0.5}
								rightIconBorderColor={COLORS.secondary}
							/>
						</Card>

						<Card borderWidth={0.5} borderColor={COLORS.secondary}>
							<CardHeader right_text="Medium Priority">
								<Badge
									text="TO DO"
									text_color={COLORS.secondary}
								/>
							</CardHeader>
							<CardBody
								leftIconName="mobile-screen-button"
								title="Mobile UI Testing"
								subtitleLeft="QA"
								subtitleRight="2h estimated"
								rightIconName="play"
								rightIconColor={COLORS.secondary}
								rightIconBackground="transparent"
								rightIconBorderWidth={0.5}
								rightIconBorderColor={COLORS.secondary}
							/>
						</Card>

						<Card borderWidth={0.5} borderColor={COLORS.secondary}>
							<CardHeader right_text="3.5h logged">
								<Badge
									text="Completed"
									text_color={COLORS.secondary}
								/>
							</CardHeader>
							<CardBody
								leftIconName="users"
								title="User Authentication"
								subtitleLeft="Backend"
								subtitleRight="4h estimated"
								rightIconName="check"
								rightIconColor={COLORS.secondary}
								rightIconBackground="transparent"
								titleDecoration="line-through"
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
