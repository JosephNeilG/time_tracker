export const CATEGORY_OPTIONS = [
	{ label: "Frontend Development", value: "Frontend" },
	{ label: "Backend Development", value: "Backend" },
	{ label: "Quality Assurance", value: "QA" },
];

export const HOUR_OPTIONS: { label: string; value: number }[] = [];
const MAX_HOUR = 8;
const SECONDS_IN_HOUR = 3600;

for (let index = 1; index <= MAX_HOUR; index++) {
	HOUR_OPTIONS.push({
		label: `${index} hr`,
		value: index * SECONDS_IN_HOUR,
	});
}

export const PRIORITY_OPTIONS = [
	{ label: "Low", value: "Low Priority" },
	{ label: "Medium", value: "Medium Priority" },
	{ label: "High", value: "High Priority" },
];
