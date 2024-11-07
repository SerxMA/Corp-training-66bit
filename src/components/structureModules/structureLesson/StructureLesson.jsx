import { useState } from 'react';

import ProgressCircle from '../ProgressCicrcle.jsx';
import Edit from './icons/Edit.jsx';
import Move from './icons/Move.jsx';
import Trash from './icons/Trash.jsx';
import ChangeLessonName from '../../../modals/changeLessonName/ChangeLessonName.jsx';
import styles from './StructureLesson.module.css';
import DeleteLesson from '../../../modals/deleteLesson/DeleteLesson.jsx';

const StructureLesson = ({ type }) => {
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);

	return (
		<div className={styles['lesson']}>
			<ProgressCircle isGreen={false} />
			<span>Lesson 1</span>
			{type === 'edit' && (
				<div className={styles['managment-btn']}>
					<button onClick={() => setEdit(true)}>
						<Edit />
					</button>
					<button onClick={() => setTrash(true)}>
						<Trash />
					</button>
					<button>
						<Move />
					</button>
				</div>
			)}
			{edit && (
				<ChangeLessonName setOpen={setEdit} lessonName={'Lesson 1'} />
			)}
			{trash && (
				<DeleteLesson setOpen={setTrash} lessonName={'Lesson 1'} />
			)}
		</div>
	);
};

export default StructureLesson;
