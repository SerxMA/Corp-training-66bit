import { useState } from 'react';

import StructureModules from '../structureModules/StructureModules.jsx';
import styles from './CourseStructure.module.css';
import Edit from './Edit.jsx';
import EditCourseStructure from '../../modals/editCourseStructure/EditCourseStructure.jsx';

const CourseStructure = () => {
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
					<button onClick={() => setPopup(true)}>
						<Edit />
					</button>
				</div>
				<StructureModules />
			</div>
			{popup && <EditCourseStructure setOpen={setPopup} />}
		</div>
	);
};

export default CourseStructure;
