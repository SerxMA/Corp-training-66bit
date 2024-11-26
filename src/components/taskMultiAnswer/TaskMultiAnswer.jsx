import { useState } from 'react';

import styles from './TaskMultiAnswer.module.css';

const TaskMultiAnswer = ({ multiAnswer }) => {
	const [selectedOptions, setSelectedOptions] = useState([]);
	const handleCheckboxChange = (id) => {
		setSelectedOptions((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter((optionId) => optionId !== id)
				: [...prevSelected, id]
		);
	};

	const isOptionSelected = selectedOptions.length > 0;
	return (
		<>
			<p className={styles.question}>
				{multiAnswer?.question || 'Это тестовый вопрос ы?'}
			</p>
			<ul className={styles.answers}>
				{multiAnswer?.answers.map((answer) => (
					<li key={answer.id} className={styles.answer}>
						<label>
							<input
								type="checkbox"
								name="multiAnswer"
								onChange={() => handleCheckboxChange(answer.id)}
							/>
							<span className={styles['custom-checkbox']}></span>
							{answer.text}
						</label>
					</li>
				)) ||
					Array.from({ length: 4 }, (_, index) => (
						<li key={index} className={styles.answer}>
							<label>
								<input
									type="checkbox"
									name="singleAnswer"
									onChange={() => handleCheckboxChange(index)}
								/>
								<span
									className={styles['custom-checkbox']}
								></span>
								Вариант {index + 1}
							</label>
						</li>
					))}
			</ul>
			<button
				className={`${styles['btn']} ${
					!isOptionSelected
						? styles['btn_disabled']
						: styles['btn_success']
				}`}
				disabled={!isOptionSelected}
			>
				Проверить
			</button>
		</>
	);
};

export default TaskMultiAnswer;
