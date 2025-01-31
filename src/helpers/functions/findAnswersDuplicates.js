import { toast } from 'react-toastify';

export const findAnswersDuplicates = (answers) => {
	const answerCounts = new Map();

	answers.forEach(({ answer }) => {
		if (answer) {
			answerCounts.set(
				answer.trimEnd(),
				(answerCounts.get(answer.trimEnd()) || 0) + 1
			);
		}
	});
	const duplicates = Array.from(answerCounts.entries())
		.filter(([_, count]) => count > 1)
		.map(([answer]) => answer);

	if (duplicates.length > 0) {
		toast.error(`Присутствуют дубликаты: ${duplicates.join(', ')}`, {
			toastId: `duble-${duplicates.join(', ')}`,
		});
		return false;
	} else return true;
};
