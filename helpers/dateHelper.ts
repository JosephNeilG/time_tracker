import dayjs from "dayjs";

export const getSprintLabel = (): string => {
	return `Sprint ${dayjs().format("YYYY-MM")}`;
};

export const getRemainingDays = (): number => {
	const today = dayjs();
	const last_day = today.endOf("month");
	return last_day.date() - today.date();
};

export const getCurrentMonthDateYear = (): string => {
	return dayjs().format("MMM D, YYYY");
};
