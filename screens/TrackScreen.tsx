import { FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import * as Progress from "react-native-progress";

import Card from "@/components/card/Card";
import DotSeparator from "@/components/DotSeparator";
import Icon from "@/components/Icon";
import TrackTaskCard from "@/components/track/TrackTaskCard";
import { COLORS } from "@/constants/Colors";
import useTrackTasks from "@/hooks/useTrackTasks";

const TrackScreen = () => {
	const { title, category, description, icon_name, progress, time_stamp } =
		useLocalSearchParams();
	const { data: track_tasks, is_loading, is_error } = useTrackTasks();

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View className="p-7 items-center w-full">
				<Card
					border_color="transparent"
					background_color={COLORS.light400}
					style={{ alignItems: "center", paddingVertical: 25 }}>
					<Icon
						name={(icon_name as string) || "code"}
						IconSet={FontAwesome6}
						container_color={COLORS.dark300}
						size={130}
					/>

					<View className="items-center my-5">
						<Text className="text-primary text-2xl font-medium mb-2">
							{title || "API Integration Setup"}
						</Text>
						<View className="flex-row flex-wrap justify-center items-center gap-1">
							<Text className="text-secondary text-base font-medium leading-6">
								{description || "Spring 2025-01"}
							</Text>
							<DotSeparator color={COLORS.secondary} size={3.5} />
							<Text className="text-secondary text-base font-medium leading-6">
								{category || "Frontend Development"}
							</Text>
						</View>
					</View>

					<View className="w-full">
						<Progress.Bar
							progress={Number(progress) || 0.47}
							width={null}
							color={COLORS.primary}
							unfilledColor="#E6E7EB"
							borderWidth={0}
							height={8}
						/>
					</View>

					<Text className="text-primary text-4xl font-medium mt-5 mb-6">
						{time_stamp || "02:34:15"}
					</Text>

					<View className="flex-row gap-6 items-center">
						<TouchableOpacity>
							<Icon
								name="backward"
								IconSet={FontAwesome6}
								is_circle
								size={50}
								icon_size={17}
								icon_color={COLORS.primary}
								container_color="transparent"
								border_color={COLORS.dark200}
								border_width={0.5}
							/>
						</TouchableOpacity>

						<TouchableOpacity>
							<Icon
								name="pause"
								IconSet={FontAwesome6}
								is_circle
								size={70}
								icon_size={22}
							/>
						</TouchableOpacity>

						<TouchableOpacity>
							<Icon
								name="forward"
								IconSet={FontAwesome6}
								is_circle
								size={50}
								icon_size={17}
								icon_color={COLORS.primary}
								container_color="transparent"
								border_color={COLORS.dark200}
								border_width={0.5}
							/>
						</TouchableOpacity>
					</View>
				</Card>

				<View className="flex-row justify-between items-center w-full mb-5 mt-1">
					<Text className="text-primary text-2xl font-medium">
						Up Next
					</Text>
					<TouchableOpacity className="flex-row items-center gap-2">
						<FontAwesome6
							name="shuffle"
							size={16}
							color={COLORS.dark100}
						/>
						<Text className="text-dark-100 text-lg font-medium leading-6">
							Shuffle
						</Text>
					</TouchableOpacity>
				</View>

				{is_loading && <ActivityIndicator size="large" />}
				{is_error && (
					<Text className="text-red-800">
						Error: {is_error.message}
					</Text>
				)}

				{track_tasks?.map((task) => (
					<TrackTaskCard key={task.id} task={task} />
				))}
			</View>
		</ScrollView>
	);
};

export default TrackScreen;
