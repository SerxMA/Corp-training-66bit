import { useState } from 'react';

import Modules from '../modules/Modules.jsx';
import styles from './CourseStructure.module.css';
import Edit from './Edit.jsx';
import EditCourseStructure from '../../modals/editCourseStructure/EditCourseStructure.jsx';

const CourseStructure = ({modules}) => {
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
				<Modules modulesList={modules} />
			</div>
			{popup && <EditCourseStructure modulesList={modules} setOpen={setPopup}/>}
		</div>
	);
};

export default CourseStructure;
