import { useState } from 'react';

import { changeText } from '../../helpers/functions/formatText';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './TaskDetailedAnswer.module.css';

const MAX_CHARS = {
	answer: 128,
};
const TaskDetailedAnswer = ({ question, role }) => {
	const [answer, setAnswer] = useState('');

	return (
		<>
			<p className={styles.question}>
				{question || 'Это тестовый вопрос ы?'}
			</p>
			<div className={styles['input-box']}>
				<input
					type="text"
					placeholder=" "
					required
					value={answer}
					onChange={(e) =>
						changeText(
							e.target.value,
							MAX_CHARS['answer'],
							(input) => setAnswer(input)
						)
					}
				/>
				<span>Ваш ответ</span>
			</div>
			{role === 'USER' && (
				<div className={styles['btn-wrapper']}>
					<MainButton
						type={!answer ? 'disabled' : 'primary'}
						disabled={!answer}
					>
						Отправить
					</MainButton>
				</div>
			)}
		</>
	);
};

export default TaskDetailedAnswer;
