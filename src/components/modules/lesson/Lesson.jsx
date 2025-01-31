import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Edit from './icons/Edit.jsx';
import Trash from './icons/Trash.jsx';
import ProgressCircle from '../ProgressCicrcle.jsx';
import ChangeName from '../../../modals/changeName/ChangeName.jsx';
import DeleteEntity from '../../../modals/deleteEntity/DeleteEntity.jsx';
import styles from './Lesson.module.css';

const Lesson = ({ type, topic }) => {
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);

	return type === 'edit' ? (
		<div className={styles.lesson}>
			<ProgressCircle isGreen={false} />
			<span>{topic.title}</span>
			<div className={styles['managment-btn']}>
				<button onClick={() => setEdit(true)}>
					<Edit />
				</button>
				<button onClick={() => setTrash(true)}>
					<Trash />
				</button>
			</div>
			{edit && (
				<ChangeName
					setOpen={setEdit}
					content={topic.title}
					type={'lesson'}
					position={topic.position}
					id={topic.id}
				/>
			)}
			{trash && (
				<DeleteEntity
					setOpen={setTrash}
					content={topic.title}
					type={'lesson'}
					id={topic.id}
				/>
			)}
		</div>
	) : (
		<NavLink
			to={`${topic.id}`}
			className={({ isActive }) =>
				`${styles.lesson} ${isActive ? styles.lesson_current : ''}`
			}
		>
			<ProgressCircle isGreen={false} />
			<span>{topic.title}</span>
		</NavLink>
	);
};

export default Lesson;
