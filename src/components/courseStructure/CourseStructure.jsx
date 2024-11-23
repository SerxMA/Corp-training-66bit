import { useState } from 'react';
import { useSelector } from 'react-redux';

import Edit from './Edit.jsx';
import Modules from '../modules/Modules.jsx';
import EditCourseStructure from '../../modals/editCourseStructure/EditCourseStructure.jsx';
import styles from './CourseStructure.module.css';

const CourseStructure = () => {
	const [editCourse, setEditCourse] = useState(false);
	const { course } = useSelector((state) => state.course);

	return (
		<div className={styles['nav-panel']}>
			<div className={styles['course-title-block']}>
				<h3 className={styles['course-title']}>{course?.title}</h3>
			</div>
			<div className={styles['course-structure']}>
				<div className={styles['course-structure-edit']}>
					<h3>Модули</h3>
					<button
						onClick={(e) => {
							setEditCourse(true);
							e.stopPropagation();
						}}
					>
						<Edit />
					</button>
				</div>
				<Modules />
			</div>
			{editCourse && (
				<EditCourseStructure course={course} setOpen={setEditCourse} />
			)}
		</div>
	);
};

export default CourseStructure;
