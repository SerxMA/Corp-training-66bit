import { useState } from 'react';

import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './TaskSingleAnswer.module.css';

const TaskSingleAnswer = ({ question, answers, role }) => {
	const [isOptionSelected, setIsOptionSelected] = useState(false);

	const handleOptionChange = () => {
		setIsOptionSelected(true);
	};
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
								type="radio"
								name="singleAnswer"
								onChange={handleOptionChange}
							/>
							<span className={styles['custom-radio']}></span>
							<p>{answer.answer}</p>
						</label>
					</li>
				)) ||
					Array.from({ length: 4 }, (_, index) => (
						<li key={index} className={styles.answer}>
							<label>
								<input
									type="radio"
									name="singleAnswer"
									onChange={handleOptionChange}
								/>
								<span className={styles['custom-radio']}></span>
								<p>Вариант {index + 1}</p>
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

export default TaskSingleAnswer;
