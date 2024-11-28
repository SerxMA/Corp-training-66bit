import AttemptsTag from '../attemptsTag/AttemptsTag.jsx';
import PointsTag from '../pointsTag/PointsTag.jsx';
import TaskDetailedAnswer from '../taskDetailedAnswer/TaskDetailedAnswer.jsx';
import TaskFreeformAnswer from '../taskFreeformAnswer/taskFreeformAnswer.jsx';
import TaskMultiAnswer from '../taskMultiAnswer/TaskMultiAnswer.jsx';
import TaskSingleAnswer from '../taskSingleAnswer/TaskSingleAnswer.jsx';
import styles from './TaskWrapper.module.css';

const TaskWrapper = ({ element }) => {
	const {
		type,
		title,
		score: points,
		countAttempts: attempts,
		description,
		questions,
	} = element;

	const titleContent = {
		SINGLE_ANSWER: {
			title: 'Тест с одиночным ответом',
			childen: (
				<TaskSingleAnswer question={description} answers={questions} />
			),
		},
		MULTI_ANSWER: {
			title: 'Тест с множественным ответом',
			childen: (
				<TaskMultiAnswer question={description} answers={questions} />
			),
		},
		DETAILED_ANSWER: {
			title: 'Задание с кратким ответом',
			childen: <TaskDetailedAnswer question={description} />,
		},
		FREEFORM_ANSWER: {
			title: 'Задание с развернутым ответом',
			childen: <TaskFreeformAnswer question={description} />,
		},
		// VIDEO,
		// PICTURE,
		TEXT: { title: title, childen: `${description}` },
	};
	return (
		<div className={styles['task-wrapper']}>
			<div className={styles['task-header']}>
				<h2>{titleContent[type].title}</h2>
				{(points || points === 0 || attempts) && (
					<div className={styles['task-tags']}>
						{(!!points || points === 0) && (
							<PointsTag>{points}</PointsTag>
						)}
						{!!attempts && <AttemptsTag>{attempts}</AttemptsTag>}
					</div>
				)}
			</div>
			{titleContent[type].childen}
		</div>
	);
};

export default TaskWrapper;
