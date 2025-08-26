import Constants from "expo-constants";
import React, { ReactNode } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface ScreenProps {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
}

const Screen = ({ children, style }: ScreenProps) => {
	return (
		<SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
	},
});

export default Screen;
