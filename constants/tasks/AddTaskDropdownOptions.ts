export const CATEGORY_OPTIONS = [
	{ label: "Frontend Development", value: "frontend" },
	{ label: "Backend Development", value: "backend" },
	{ label: "Quality Assurance", value: "qa" },
];

export const HOUR_OPTIONS: { label: string; value: number }[] = [];
const MAX_HOUR = 8;

for (let index = 1; index <= MAX_HOUR; index++) {
	HOUR_OPTIONS.push({ label: `${index} hr`, value: index });
}

export const PRIORITY_OPTIONS = [
	{ label: "Low", value: "low" },
	{ label: "Medium", value: "medium" },
	{ label: "High", value: "high" },
];
