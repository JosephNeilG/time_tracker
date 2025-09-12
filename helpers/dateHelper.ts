import dayjs from "dayjs";

/**
 * DOCU: getSprintLabel - Generate a spring label based on current year and month
 * Uses dayjs to format the current date as "YYYY-MM"
 */
export const getSprintLabel = (): string => {
	return `Sprint ${dayjs().format("YYYY-MM")}`;
};

/**
 * DOCU: getRemainingDays - Calculate remaining days of the month
 * Uses dayjs to get today's date and the last day of the month, then computes the difference.
 */
export const getRemainingDays = (): number => {
	const today = dayjs();
	const last_day = today.endOf("month");

	return last_day.date() - today.date();
};

/**
 * DOCU: getCurrentMonthDateYear - Format current date as "MM D, YYYY"
 * Uses dayjs to display month abbreviation, day, and year
 */
export const getCurrentMonthDateYear = (date?: Date): string => {
	return dayjs(date ?? Date()).format("MMM D, YYYY");
};

/**
 * DOCU: getPrevDate - Get previous day from given date
 * @param date A JS Date or date string
 * @returns New Date object, one day earlier
 */
export const getPrevDate = (date: Date | string): Date => {
	return dayjs(date).subtract(1, "day").toDate();
};

/**
 * DOCU: getNextDate - Get next day from given date
 * @param date A JS Date or date string
 * @returns New Date object, one day later
 */
export const getNextDate = (date: Date | string): Date => {
	return dayjs(date).add(1, "day").toDate();
};
