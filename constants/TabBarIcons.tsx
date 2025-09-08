import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const TAB_BAR_ICONS = {
	index: (props: any) => <FontAwesome6 name="play" size={22} {...props} />,
	tasks: (props: any) => <FontAwesome6 name="list-ul" size={22} {...props} />,
	analytics: (props: any) => (
		<FontAwesome6 name="chart-bar" size={22} {...props} />
	),
};
