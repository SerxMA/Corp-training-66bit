import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { changeText } from '../../helpers/functions/formatText';
import { postContentsUser } from '../../store/actions/contents.js';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './TaskDetailedAnswer.module.css';
import Check from '../../UI/svg/check/Check.jsx';
import Incorrect from '../../UI/svg/incorrect/Incorrect.jsx';

const MAX_CHARS = {
	answer: 128,
};
const TaskDetailedAnswer = ({
	question,
	role,
	contentId,
	userContent,
	countAttempts,
}) => {
	const dispatch = useDispatch();
	const { modules } = useSelector((state) => state.modules);
	const [answer, setAnswer] = useState(userContent ? userContent.answer : '');
	const { topicId } = useParams();
	const handleSubmit = () => {
		const currentTopic = modules
			.find(({ topics }) => topics.some(({ id }) => id === +topicId))
			?.topics.find(({ id }) => id === +topicId);
		if (currentTopic) {
			const config = {
				data: [answer],
				params: {
					contentId,
					userTopicId: currentTopic.userTopic.id,
					currentAttempts: userContent
						? userContent.currentAttempts
						: countAttempts,
				},
			};
			console.log(config);
			dispatch(
				postContentsUser(config, {
					params: {
						topicId,
						userTopicId: currentTopic.userTopic.id,
					},
				})
			);
		}
	};

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
					disabled={userContent?.completed}
				/>
				<span>Ваш ответ</span>
			</div>
			{role === 'USER' && (
				<div className={styles['btn-wrapper']}>
					<MainButton
						onClick={handleSubmit}
						type={
							!answer || userContent?.completed
								? 'disabled'
								: 'primary'
						}
						disabled={!answer || userContent?.completed}
					>
						Отправить
					</MainButton>
					{userContent?.success && <Check />}
					{!userContent?.success && <Incorrect />}
				</div>
			)}
		</>
	);
};

export default TaskDetailedAnswer;
