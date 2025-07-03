export function formatDate(dateValue: string | number) {
	const date = new Date(dateValue); // Handles both ISO string and timestamp
	if (isNaN(date.getTime())) return "Invalid Date";
	const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
	return date.toLocaleDateString("en-US", options);
}

// Example usage:
const timestamp = 1704067200000;
const formattedDate = formatDate(timestamp);
console.log(formattedDate); // Output: "12 Dec 2023"