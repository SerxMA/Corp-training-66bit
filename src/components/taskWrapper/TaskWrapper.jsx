import { useState } from 'react';
import ReactPlayer from 'react-player';

import { useAuth } from '../../customHooks/useAuth.js';
import AttemptsTag from '../attemptsTag/AttemptsTag.jsx';
import PointsTag from '../pointsTag/PointsTag.jsx';
import TaskDetailedAnswer from '../taskDetailedAnswer/TaskDetailedAnswer.jsx';
import TaskFreeformAnswer from '../taskFreeformAnswer/TaskFreeformAnswer.jsx';
import TaskMultiAnswer from '../taskMultiAnswer/TaskMultiAnswer.jsx';
import TaskSingleAnswer from '../taskSingleAnswer/TaskSingleAnswer.jsx';
import NewText from '../../modals/newText/NewText.jsx';
import DeleteEntity from '../../modals/deleteEntity/DeleteEntity.jsx';
import NewTest from '../../modals/newTest/NewTest.jsx';
import NewTask from '../../modals/newTask/NewTask.jsx';
import styles from './TaskWrapper.module.css';

const TaskWrapper = ({ element }) => {
	const {
		id,
		type,
		title,
		score: points,
		countAttempts: attempts,
		fileUrl,
		description,
		questions,
		position,
	} = element;
	const { role } = useAuth();
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);

	const content = {
		SINGLE_ANSWER: {
			title: 'Тест с одиночным ответом',
			children: (
				<TaskSingleAnswer question={description} answers={questions} />
			),
			edit: (
				<NewTest
					setOpen={setEdit}
					type={'one'}
					position={position}
					data={element}
				/>
			),
			trash: <DeleteEntity setOpen={setTrash} type={'task'} id={id} />,
		},
		MULTI_ANSWER: {
			title: 'Тест с множественным ответом',
			children: (
				<TaskMultiAnswer question={description} answers={questions} />
			),
			edit: (
				<NewTest
					setOpen={setEdit}
					type={'multi'}
					position={position}
					data={element}
				/>
			),
			trash: <DeleteEntity setOpen={setTrash} type={'task'} id={id} />,
		},
		DETAILED_ANSWER: {
			title: 'Задание с кратким ответом',
			children: <TaskDetailedAnswer question={description} />,
			edit: (
				<NewTask
					setOpen={setEdit}
					type={'one'}
					position={position}
					data={element}
				/>
			),
			trash: <DeleteEntity setOpen={setTrash} type={'task'} id={id} />,
		},
		FREEFORM_ANSWER: {
			title: 'Задание с развернутым ответом',
			children: <TaskFreeformAnswer question={description} />,
			edit: (
				<NewTask
					setOpen={setEdit}
					type={'multi'}
					position={position}
					data={element}
				/>
			),
			trash: <DeleteEntity setOpen={setTrash} type={'task'} id={id} />,
		},
		VIDEO: {
			title: null,
			children: (
				<div className={styles['player-wrapper']}>
					<ReactPlayer
						light
						controls
						url={fileUrl}
						// url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
						width="100%"
						height="100%"
						playing
					/>
				</div>
			),
			trash: <DeleteEntity setOpen={setTrash} type={'task'} id={id} />,
		},
		PICTURE: {
			children: (
				<div className={styles['img-wrapper']}>
					<img src={fileUrl} alt="Задание" />
				</div>
			),
		},
		TEXT: {
			title: title,
			children: <p>{description}</p>,
			edit: (
				<NewText setOpen={setEdit} position={position} data={element} />
			),
			trash: <DeleteEntity setOpen={setTrash} type={'task'} id={id} />,
		},
	};
	return (
		<div className={styles['task-wrapper']}>
			{type !== 'VIDEO' && type !== 'PICTURE' && (
				<div className={styles['task-header']}>
					<h3>{content[type].title}</h3>
					{(points || points === 0 || attempts) && (
						<div className={styles['task-tags']}>
							{(!!points || points === 0) && (
								<PointsTag>{points}</PointsTag>
							)}
							{!!attempts && (
								<AttemptsTag>{attempts}</AttemptsTag>
							)}
						</div>
					)}
			{type !== 'VIDEO' && type !== 'PICTURE' && (
				<div className={styles['task-header']}>
					<h2>{content[type].title}</h2>
				</div>
			)}
			{content[type].children}
			{role === 'ADMIN' && (
				<div className={styles['change-task']}>
					<button
						className={styles['svg-wrapper']}
						onClick={(e) => {
							setEdit(true);
							e.stopPropagation();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="17"
							height="17"
							viewBox="0 0 17 17"
							fill="none"
						>
							<path
								d="M3.83398 4.83342H3.00065C2.55862 4.83342 2.1347 5.00902 1.82214 5.32158C1.50958 5.63414 1.33398 6.05806 1.33398 6.50009V14.0001C1.33398 14.4421 1.50958 14.866 1.82214 15.1786C2.1347 15.4912 2.55862 15.6668 3.00065 15.6668H10.5007C10.9427 15.6668 11.3666 15.4912 11.6792 15.1786C11.9917 14.866 12.1673 14.4421 12.1673 14.0001V13.1668M11.334 3.16676L13.834 5.66676M14.9882 4.48759C15.3164 4.15938 15.5007 3.71424 15.5007 3.25009C15.5007 2.78594 15.3164 2.34079 14.9882 2.01259C14.6599 1.68438 14.2148 1.5 13.7507 1.5C13.2865 1.5 12.8414 1.68438 12.5132 2.01259L5.50065 9.00009V11.5001H8.00065L14.9882 4.48759Z"
								stroke="#898E94"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button
						className={styles['svg-wrapper']}
						onClick={(e) => {
							setTrash(true);
							e.stopPropagation();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M3.33398 5.83333H16.6673M8.33398 9.16667V14.1667M11.6673 9.16667V14.1667M4.16732 5.83333L5.00065 15.8333C5.00065 16.2754 5.17625 16.6993 5.48881 17.0118C5.80137 17.3244 6.22529 17.5 6.66732 17.5H13.334C13.776 17.5 14.1999 17.3244 14.5125 17.0118C14.8251 16.6993 15.0007 16.2754 15.0007 15.8333L15.834 5.83333M7.50065 5.83333V3.33333C7.50065 3.11232 7.58845 2.90036 7.74473 2.74408C7.90101 2.5878 8.11297 2.5 8.33398 2.5H11.6673C11.8883 2.5 12.1003 2.5878 12.2566 2.74408C12.4129 2.90036 12.5007 3.11232 12.5007 3.33333V5.83333"
								stroke="#898E94"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			)}
			{edit && content[type].edit}
			{trash && content[type].trash}
		</div>
	);
};

export default TaskWrapper;
