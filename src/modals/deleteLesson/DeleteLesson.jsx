import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import ico from '../../assets/images/danger.png';
import styles from './DeleteLesson.module.css';

const DeleteLesson = ({ setOpen, lessonName }) => {
	const [second, setSecond] = useState(5);
	const timer = () => {
		const intervalId = setInterval(() => {
			setSecond((cv) => {
				if (cv <= 0) {
					clearInterval(intervalId);
					return -1;
				}
				return cv - 1;
			});
		}, 1000);
	};

	useEffect(() => {
		timer();
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<img src={ico} alt="Знак опасно" />
				</div>
				<div className={styles.body}>
					<p className={styles.question}>
						Вы уверены, что хотите удалить
						<br />
						<span>{lessonName}?</span>
					</p>
					<p className={styles.desciption}>
						Это действие не может быть отменено.
						<br />
						Удалив урок, вы потеряете все внесенные данные.
					</p>
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
							second < 0
								? styles.btn_success
								: styles.btn_disabled
						}`}
						disabled={second >= 0}
					>
						{second >= 0 ? `Удалить (${second} c.)` : 'Удалить'}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default DeleteLesson;
