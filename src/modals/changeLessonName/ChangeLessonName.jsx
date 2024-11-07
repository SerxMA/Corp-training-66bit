import { useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import styles from './ChangeLessonName.module.css';

const ChangeLessonName = ({ setOpen, lessonName }) => {
	const [name, setName] = useState(lessonName ? lessonName : '');

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>
						{lessonName ? 'Редактировать урок' : 'Новый урок'}
					</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				<div className={styles['input-box']}>
					<input
						type="text"
						name="title"
						placeholder=" "
						required
						value={name}
						onChange={(e) =>
							setName(
								e.target.value.trimStart().replace('  ', ' ')
							)
						}
					/>
					<span>Название</span>
				</div>
				<div className={styles['btn-wrapper']}>
					<button
						className={`${styles.btn} ${styles.btn_cencel}`}
						onClick={() => setOpen(false)}
					>
						Отмена
					</button>
					<button
						className={`${styles['btn']} ${
							name.length
								? styles.btn_success
								: styles.btn_disabled
						}`}
						disabled={!name.length}
					>
						Готово
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default ChangeLessonName;
