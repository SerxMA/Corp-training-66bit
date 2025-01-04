import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth.js';
import Edit from './Edit.jsx';
import Modules from '../modules/Modules.jsx';
import EditCourseStructure from '../../modals/editCourseStructure/EditCourseStructure.jsx';
import styles from './CourseStructure.module.css';
import { calculatePercentage } from '../../helpers/functions/calculatePercentage.js';

const CourseStructure = ({ currentScore }) => {
	const { course } = useSelector((state) => state.course);
	const [editCourse, setEditCourse] = useState(false);
	const { role } = useAuth();

	return (
		<div className={styles['nav-panel']}>
			<div className={styles['course-title-block']}>
				<h3 className={styles['course-title']}>{course?.title}</h3>
			</div>
			{role === 'USER' && (
				<div className={styles.statistic}>
					Это прогресс -{' '}
					{calculatePercentage(course.score, currentScore)}%
				</div>
			)}
			<div className={styles['course-structure']}>
				<div className={styles['course-structure-edit']}>
					<h3>Модули</h3>
					{role === 'ADMIN' && (
						<button
							onClick={(e) => {
								setEditCourse(true);
								e.stopPropagation();
							}}
						>
							<Edit />
						</button>
					)}
				</div>
				<div className={styles['table-box']}>
					<Modules />
				</div>
			</div>
			{editCourse && (
				<EditCourseStructure course={course} setOpen={setEditCourse} />
			)}
		</div>
	);
};

export default CourseStructure;
