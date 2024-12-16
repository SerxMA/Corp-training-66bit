export const findAnswersDuplicates = (answers) => {
	const answerCounts = new Map();

	answers.forEach(({ answer }) => {
		if (answer) {
			answerCounts.set(answer, (answerCounts.get(answer) || 0) + 1);
		}
	});
	const duplicates = Array.from(answerCounts.entries())
		.filter(([_, count]) => count > 1)
		.map(([answer]) => answer);

	if (duplicates.length > 0) {
		alert(`Присутствуют дубликаты: ${duplicates.join(', ')}`);
		return false;
	} else return true;
};
