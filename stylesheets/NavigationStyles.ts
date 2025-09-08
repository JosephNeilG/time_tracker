import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const NavigationStyles = StyleSheet.create({
	fab: {
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		shadowOpacity: 0.1,
		elevation: 4,
	},
	tabBar: {
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 8,
		shadowOpacity: 0.1,
		elevation: 4,
		backgroundColor: COLORS.light400,
	},
});
