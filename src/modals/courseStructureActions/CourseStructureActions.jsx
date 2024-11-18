import { useState } from 'react';

import FileText from '../FileText.jsx';
import Photo from '../Photo.jsx';
import Trash from '../Trash.jsx';
import DeleteEntity from '../deleteEntity/DeleteEntity.jsx';
import styles from './CourseStructureActions.module.css';
import WrapperCourseCreator from '../wrapperCourseCreator/WrapperCourseCreator.jsx';

const CourseStructureActions = () => {
	const [changeInfo, setChangeInfo] = useState(false);
	const [changeImg, setChangeImg] = useState(false);
	const [deleteCourse, setDeleteCourse] = useState(false);

	return (
		<ul
			className={styles['actions-list']}
			onClick={(e) => e.stopPropagation()}
		>
			<li className={styles.action} onClick={() => setChangeInfo(true)}>
				<FileText />
				<p>Изменить информацию</p>
			</li>
			<li className={styles.action} onClick={() => setChangeImg(true)}>
				<Photo />
				<p>Изменить иллюстрацию</p>
			</li>
			<li className={styles.action} onClick={() => setDeleteCourse(true)}>
				<Trash />
				<p>Удалить курс</p>
			</li>
			{changeInfo && (
				<WrapperCourseCreator setOpen={setChangeInfo} stage={1} />
			)}
			{changeImg && (
				<WrapperCourseCreator setOpen={setChangeImg} stage={2} />
			)}
			{deleteCourse && (
				<DeleteEntity
					setOpen={setDeleteCourse}
					type={'course'}
					content={'Тут должно быть название курса'}
				/>
			)}
		</ul>
	);
};

export default CourseStructureActions;
