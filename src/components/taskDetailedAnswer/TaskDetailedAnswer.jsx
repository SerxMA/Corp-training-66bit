import { useState } from 'react';

import { changeText } from '../../helpers/functions/formatText';
import styles from './TaskDetailedAnswer.module.css';

const MAX_CHARS = {
	answer: 128,
};
const TaskDetailedAnswer = ({ detailedAnswer }) => {
	const [answer, setAnswer] = useState('');

	return (
		<>
			<p className={styles.question}>
				{detailedAnswer?.question || 'Это тестовый вопрос ы?'}
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
			<button
				className={`${styles['btn']} ${
					!answer ? styles['btn_disabled'] : styles['btn_success']
				}`}
				disabled={!answer}
			>
				Отправить
			</button>
		</>
	);
};

export default TaskDetailedAnswer;
