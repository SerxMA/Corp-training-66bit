import { useState } from 'react';

import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './TaskMultiAnswer.module.css';

const TaskMultiAnswer = ({ question, answers, role }) => {
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
				{question || 'Это тестовый вопрос ы?'}
			</p>
			<ul className={styles.answers}>
				{answers?.map((answer) => (
					<li key={answer.id} className={styles.answer}>
						<label>
							<input
								type="checkbox"
								name="multiAnswer"
								onChange={() => handleCheckboxChange(answer.id)}
							/>
							<span className={styles['custom-checkbox']}></span>
							<p>{answer.answer}</p>
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
			{role === 'USER' && (
				<div className={styles['btn-wrapper']}>
					<MainButton
						type={!isOptionSelected ? 'disabled' : 'primary'}
						disabled={!isOptionSelected}
					>
						Проверить
					</MainButton>
				</div>
			)}
		</>
	);
};

export default TaskMultiAnswer;
