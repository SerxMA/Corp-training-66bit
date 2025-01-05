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
				<div className={styles['statistic-wrapper']}>
					<div className={styles.statistic}>
						<h4>Прогресс</h4>
						<div className={styles.progress}>
							<svg
								className={styles.circle}
								width="142"
								height="142"
								viewBox="0 0 142 142"
							>
								<circle
									r="61"
									cx={71}
									cy={71}
									stroke="var(--accent-background)"
									strokeWidth={18.5405}
									fill="none"
								/>
							</svg>
							<svg
								className={styles['circle-progress']}
								width="142"
								height="142"
								viewBox="0 0 142 142"
								strokeDasharray="384"
								strokeDashoffset={`${Math.abs(
									Math.min(
										(calculatePercentage(
											course.score,
											currentScore
										) *
											384) /
											100,
										384
									) - 384
								)}`}
							>
								<circle
									r="61"
									cx={71}
									cy={71}
									stroke="var(--accent-primary)"
									strokeWidth={18.5405}
									fill="none"
								/>
							</svg>
							<h2>
								{calculatePercentage(
									course.score,
									currentScore
								)}
								%
							</h2>
						</div>
					</div>
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
