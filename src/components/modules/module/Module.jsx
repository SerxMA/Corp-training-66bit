import { useState } from 'react';

import Plus from '../Plus.jsx';
import DrDown from '../DrDown.jsx';
import ProgressCircle from '../ProgressCicrcle.jsx';
import styles from './Module.module.css';
import Lessons from '../lessons/Lessons.jsx';
import ChangeLessonName from '../../../modals/changeLessonName/ChangeLessonName.jsx';
import Edit from '../lesson/icons/Edit.jsx';
import Trash from '../lesson/icons/Trash.jsx';

const Module = ({ type, content }) => {
	const [expanded, setExapnded] = useState(false);
	const [newLesson, setNewLesson] = useState(false);
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);

	const handleClick = () => {
		setExapnded(!expanded);
	};

	return (
		<div
			className={`${styles['module-container']} ${
				expanded && styles['is-expanded-module']
			}`}
		>
			<div
				className={`${styles['content']} ${
					expanded && styles['is-expanded-content']
				}`}
				onClick={handleClick}
			>
				<ProgressCircle isGreen={true} />
				<div className={styles['content-text']}>
					<span className={styles['course-title']}>{content.title}</span>
					<div className={styles['manage-btn']}>
						{type === 'edit' && (
							<>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setNewLesson(true);
								}}
							>
								<Plus />
							</button>
							<button onClick={() => setEdit(true)}>
								<Edit />
							</button>
							<button onClick={() => setTrash(true)}>
								<Trash />
							</button>
							</>
						)}
						<DrDown />
					</div>
				</div>
			</div>
			<Lessons expandedState={expanded} type={type} topics={content.topics} />
			{newLesson && <ChangeLessonName setOpen={setNewLesson} />}
		</div>
	);
};

export default Module;
