import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './TaskSingleAnswer.module.css';
import { postContentsUser } from '../../store/actions/contents.js';
import Check from '../../UI/svg/check/Check.jsx';
import Incorrect from '../../UI/svg/incorrect/Incorrect.jsx';
import RadioButton from '../../UI/inputs/radioButton/RadioButton.jsx';

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
		answers
			? answers.map((answer) => ({
					...answer,
					state: userContent
						? userContent.answer.includes(answer.answer)
						: false,
			  }))
			: []
	);
	const { topicId } = useParams();
	console.log(answers);
	console.log(currAnswers);

	const toggleAnswerState = (answerId) => {
		setCurrAnswers((cv) =>
			cv.map((answer) =>
				answer.id === answerId
					? { ...answer, state: true }
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

	useEffect(() => {
		setCurrAnswers(
			answers
				? answers.map((answer) => ({
						...answer,
						state: userContent
							? userContent.answer.includes(answer.answer)
							: false,
				  }))
				: []
		);
	}, [answers]);

	return (
		<>
			<p className={styles.question}>
				{question || 'Это тестовый вопрос ы?'}
			</p>
			<ul className={styles.answers}>
				{currAnswers?.map((answer) => (
					<li key={answer.id} className={styles.answer}>
						<label
							onClick={() =>
								!userContent?.completed &&
								toggleAnswerState(answer.id)
							}
						>
							<RadioButton
								state={answer.state}
								disabled={
									userContent?.answer.includes(
										answer.answer
									) && userContent.success
								}
							/>
							<p>{answer.answer}</p>
							{userContent?.answer.includes(answer.answer) &&
								userContent.success && <Check />}
							{userContent?.answer.includes(answer.answer) &&
								!userContent.success && <Incorrect />}
						</label>
					</li>
				)) ||
					Array.from({ length: 4 }, (_, index) => (
						<li key={index} className={styles.answer}>
							<label>
								<RadioButton />
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
							!currAnswers.some((answer) => answer.state) ||
							userContent?.completed
								? 'disabled'
								: 'primary'
						}
						disabled={
							!currAnswers.some((answer) => answer.state) ||
							userContent?.completed
						}
					>
						Проверить
					</MainButton>
				</div>
			)}
		</>
	);
};

export default TaskSingleAnswer;
