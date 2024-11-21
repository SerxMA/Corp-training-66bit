import { useEffect, useState } from 'react';

import Edit from './Edit.jsx';
import Modules from '../modules/Modules.jsx';
import EditCourseStructure from '../../modals/editCourseStructure/EditCourseStructure.jsx';
import styles from './CourseStructure.module.css';
import { api } from '../../api/index.js';

const CourseStructure = ({ modules, setIsDataChanged, id }) => {
	const [popup, setPopup] = useState(false);
	const [course, setCourse] = useState({});
	const [isCourseChanged, setIsCourseChanged] = useState(false);

	useEffect(() => {
		api.courses
			.getCourse({ url: `/${id}` })
			.then((res) => {
				setCourse(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
		setIsCourseChanged(false);
	}, [isCourseChanged]);

	return (
		<div className={styles['nav-panel']}>
			<div className={styles['course-title-block']}>
				<h3 className={styles['course-title']}>{course.title}</h3>
			</div>
			<div className={styles['course-structure']}>
				<div className={styles['course-structure-edit']}>
					<h3>Модули</h3>
					<button
						onClick={(e) => {
							setPopup(true);
							e.stopPropagation();
						}}
					>
						<Edit />
					</button>
				</div>
				<Modules modulesList={modules} />
			</div>
			{popup && (
				<EditCourseStructure
					modulesList={modules}
					courseName={course.title}
					courseObj={course}
					setOpen={setPopup}
					setIsDataChanged={setIsDataChanged}
					setIsCourseChanged={setIsCourseChanged}
				/>
			)}
		</div>
	);
};

export default CourseStructure;
