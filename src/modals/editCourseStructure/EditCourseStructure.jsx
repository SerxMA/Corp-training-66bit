import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import StructureModules from '../../components/structureModules/StructureModules.jsx';
import styles from './EditCourseStructure.module.css';

const EditCourseStructure = ({ setOpen }) => {
	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Редактировать структуру</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['table-box']}>
						<StructureModules type={'edit'} />
						<StructureModules type={'edit'} />
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<button
						className={`${styles['btn']} ${styles['btn_success']}`}
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
