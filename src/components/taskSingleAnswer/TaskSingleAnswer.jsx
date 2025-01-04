import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './TaskSingleAnswer.module.css';
import { postContentsUser } from '../../store/actions/contents.js';

const TaskSingleAnswer = ({
	question,
	answers,
	role,
	contentId,
	userContent,
	countAttempts,
}) => {
	const dispatch = useDispatch();
	const { modules } = useSelector((state) => state.modules);
	const [currAnswers, setCurrAnswers] = useState(
		answers ? answers.map((answer) => ({ ...answer, state: false })) : []
	);
	const { topicId } = useParams();

	const toggleAnswerState = (answerId) => {
		setCurrAnswers((cv) =>
			cv.map((answer) =>
				answer.id === answerId
					? { ...answer, state: !answer.state }
					: { ...answer, state: false }
			)
		);
	};
	const handleSubmit = () => {
		const currentTopic = modules
			.find(({ topics }) => topics.some(({ id }) => id === +topicId))
			?.topics.find(({ id }) => id === +topicId);
		if (currentTopic) {
			const config = {
				data: currAnswers
					.filter((answer) => answer.state)
					.map((answer) => answer.answer),
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
			<ul className={styles.answers}>
				{currAnswers?.map((answer) => (
					<li key={answer.id} className={styles.answer}>
						<label>
							<input
								type="radio"
								name="singleAnswer"
								onChange={() => toggleAnswerState(answer.id)}
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
									onChange={toggleAnswerState}
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
						onClick={handleSubmit}
						type={
							!currAnswers.some((answer) => answer.state)
								? 'disabled'
								: 'primary'
						}
						disabled={!currAnswers.some((answer) => answer.state)}
					>
						Проверить
					</MainButton>
				</div>
			)}
		</>
	);
};

export default TaskSingleAnswer;
