import { Stack } from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "./global.css";

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<PaperProvider>
					<Stack>
						<Stack.Screen
							name="auth"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
					</Stack>
				</PaperProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
