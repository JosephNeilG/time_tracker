import LottieView from "lottie-react-native";
import React from "react";

const LoadingIndicator = () => {
	return (
		<LottieView
			autoPlay
			style={{ width: 200, height: 100 }}
			source={require("@/assets/animations/loading.json")}
		/>
	);
};

export default LoadingIndicator;
