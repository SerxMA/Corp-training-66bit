import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import Modules from '../../components/modules/module/Module.jsx';
import styles from './EditCourseStructure.module.css';
import Module from '../../components/modules/module/Module.jsx';

const EditCourseStructure = ({ setOpen, modulesList }) => {
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
				onClick={(e) => e.stopPropagation()}
			>
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
					<ul style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
						{
							modulesList.map((module, index) => (
								<Module content={module} type={'edit'} key={index} />
							))
						}
					</ul>
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
