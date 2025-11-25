export const formatDate = (dateStr: string) => {
	if (!dateStr) return "";
	const [year, month] = dateStr.split("-");
	return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
	});
};
