import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import TextGroup from "@/components/TextGroup";
import { COLORS } from "@/constants/Colors";

interface NoTaskProps {
	onSync: () => void;
}

const EmptyTaskView = ({ onSync }: NoTaskProps) => {
	return (
		<>
			<Icon
				IconSet={FontAwesome6}
				name="list-check"
				is_circle
				icon_size={40}
				size={140}
				container_color={COLORS.primary}
				style={{ marginBottom: 10 }}
			/>

			<TextGroup
				title="No Tasks Yet"
				sub_title="Sync your FocusTracker tasks to start tracking your time and managing your sprint efficiently."
				style={{ marginBottom: 30 }}
			/>

			<Button
				text="Sync FocusTracker Tasks"
				background_color={COLORS.primary}
				text_color={COLORS.white}
				icon_name="sync"
				IconComponent={FontAwesome5}
				icon_color={COLORS.white}
				width="82%"
				style={{ marginBottom: 18 }}
				onPress={onSync}
			/>
			<Button
				text="Create Manual Task"
				IconComponent={FontAwesome6}
				icon_name="plus"
				icon_color={COLORS.dark500}
				style={{ marginBottom: 18 }}
			/>

			<TouchableOpacity>
				<Text className="text-secondary text-base mb-10 font-medium">
					Import from CSV
				</Text>
			</TouchableOpacity>

			<View
				className="w-full flex-row p-4 rounded-lg"
				style={{ backgroundColor: COLORS.light100 }}>
				<View style={{ marginTop: 10 }}>
					<FontAwesome6
						name="circle-info"
						size={15}
						color={COLORS.primary}
					/>
				</View>

				<View className="ml-3 flex-1">
					<Text className="text-base font-medium text-dark-500 mb-1">
						Connect FocusTracker
					</Text>
					<Text className="text-sm font-medium text-dark-100">
						Link your FocusTracker account to automatically sync
						sprint tasks and track time seamlessly across both
						platforms.
					</Text>
				</View>
			</View>
		</>
	);
};

export default EmptyTaskView;
