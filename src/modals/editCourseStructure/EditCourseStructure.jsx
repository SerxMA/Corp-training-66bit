import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Dots from '../Dots.jsx';
import StructureModules from '../../components/structureModules/StructureModules.jsx';
import CourseStructureActions from '../courseStructureActions/CourseStructureActions.jsx';
import styles from './EditCourseStructure.module.css';

const EditCourseStructure = ({ setOpen }) => {
	const [courseActions, setCourseActions] = useState(false);

	useEffect(() => {
		const closePopup = () => setOpen(false);

		document.body.style.overflowY = 'hidden';
		document.addEventListener('click', closePopup);

		return () => {
			document.body.style.overflowY = 'unset';
			document.removeEventListener('click', closePopup);
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => {
					e.stopPropagation();
					setCourseActions(false);
				}}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Структура курса</h2>
					<button
						className={styles['dots']}
						onClick={(e) => {
							e.stopPropagation();
							setCourseActions((cv) => !cv);
						}}
					>
						<Dots />
					</button>
					{courseActions && <CourseStructureActions />}
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['table-box']}>
						<StructureModules type={'edit'} />
						<StructureModules type={'edit'} />
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<button
						className={`${styles.btn} ${styles.btn_cancel}`}
						onClick={() => setOpen(false)}
					>
						Отмена
					</button>
					<button
						className={`${styles.btn} ${styles['btn_success']}`}
						onClick={() => setOpen(false)}
					>
						Готово
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default EditCourseStructure;
