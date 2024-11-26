import AttemptsTag from '../attemptsTag/AttemptsTag.jsx';
import PointsTag from '../pointsTag/PointsTag.jsx';
import styles from './TaskWrapper.module.css';

const TaskWrapper = ({ type, title, points, attempts, children }) => {
	const titleContent = {
		yourTitle: title,
		text: 'Текстовая лекция',
		singleAnswer: 'Тест с одиночным ответом',
		multiAnswer: 'Тест с множественным ответом',
		detailedAnswer: 'Задание с кратким ответом',
		freeformAnswer: 'Задание с развернутым ответом',
	};
	return (
		<div className={styles['task-wrapper']}>
			<div className={styles['task-header']}>
				<h2>{titleContent[type]}</h2>
				{(points || attempts) && (
					<div className={styles['task-tags']}>
						{points && <PointsTag>{points}</PointsTag>}
						{attempts && <AttemptsTag>{attempts}</AttemptsTag>}
					</div>
				)}
			</div>
			{children}
		</div>
	);
};

export default TaskWrapper;
