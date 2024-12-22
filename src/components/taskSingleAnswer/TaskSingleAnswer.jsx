import { useState } from 'react';

import styles from './TaskSingleAnswer.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton';

const TaskSingleAnswer = ({ question, answers }) => {
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
							<p>{answer.question}</p>
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
			<div className={styles['btn-wrapper']}>
				<MainButton
					type={!isOptionSelected ? 'disabled' : 'primary'}
					disabled={!isOptionSelected}
				>
					Проверить
				</MainButton>
			</div>
		</>
	);
};

export default TaskSingleAnswer;
