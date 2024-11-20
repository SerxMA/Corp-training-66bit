import { useState } from 'react';

import Edit from './Edit.jsx';
import Modules from '../modules/Modules.jsx';
import EditCourseStructure from '../../modals/editCourseStructure/EditCourseStructure.jsx';
import styles from './CourseStructure.module.css';

const CourseStructure = ({ modules, setIsDataChanged }) => {
	const [popup, setPopup] = useState(false);

	return (
		<div className={styles['nav-panel']}>
			<div className={styles['course-title-block']}>
				<h3 className={styles['course-title']}>
					Графический дизайн для начинающих в фигме
				</h3>
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
				<Modules modulesList={modules} setIsDataChanged={setIsDataChanged}/>
			</div>
			{popup && (
				<EditCourseStructure
					modulesList={modules}
					courseName={'Графический дизайн для начинающих в фигме'}
					setOpen={setPopup}
					setIsDataChanged={setIsDataChanged}
				/>
			)}
		</div>
	);
};

export default CourseStructure;
