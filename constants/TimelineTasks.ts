import { COLORS } from "@/constants/Colors";
import moment from "moment";

export const TIMELINE_TASKS = [
	{
		title: "API Integration",
		startDate: moment().set({ hour: 9, minute: 0 }).toDate(),
		endDate: moment().set({ hour: 11, minute: 15 }).toDate(),
		color: COLORS.dark500,
		type: "work",
	},
	{
		title: "Break",
		startDate: moment().set({ hour: 11, minute: 16 }).toDate(),
		endDate: moment().set({ hour: 11, minute: 55 }).toDate(),
		color: "gray",
		type: "break",
	},
	{
		title: "Database Migration",
		startDate: moment().set({ hour: 12, minute: 30 }).toDate(),
		endDate: moment().set({ hour: 16, minute: 0 }).toDate(),
		color: "#384152",
		type: "work",
	},
	{
		title: "Break",
		startDate: moment().set({ hour: 16, minute: 1 }).toDate(),
		endDate: moment().set({ hour: 16, minute: 29 }).toDate(),
		color: "gray",
		type: "break",
	},
	{
		title: "Mobile Testing",
		startDate: moment().set({ hour: 16, minute: 30 }).toDate(),
		endDate: moment().set({ hour: 18, minute: 0 }).toDate(),
		color: "#6B7380",
		type: "work",
	},
];
