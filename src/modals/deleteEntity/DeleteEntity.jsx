import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { api } from '../../api';
import ico from '../../assets/images/danger.png';
import styles from './DeleteEntity.module.css';

const identificationType = {
	course: { sec: 10, string: 'курс', url: '/courses' },
	module: { sec: 5, string: 'модуль', url: '/modules' },
	lesson: { sec: -1, string: 'урок', url: '/topics' },
};

const DeleteEntity = ({ setOpen, type, content, id, setIsDataChanged }) => {
	const [second, setSecond] = useState(identificationType[type]?.sec || -1);
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

	const navigate = useNavigate();

	const handleSubmit = () => {
		api.courses
			.deleteEntity({ url: identificationType[type].url + `/${id}` })
			.then(() => {
				setOpen(false);
				setIsDataChanged(true); // при удалении курса излишне
				if (type === 'course') {
					navigate('/courses/all-courses');
				}
			});
	};

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<img src={ico} alt="Знак опасно" />
				</div>
				<div className={styles.body}>
					<p className={styles.question}>
						Вы уверены, что хотите удалить{' '}
						{identificationType[type]?.string || 'неизвестный тип'}
						<br />
						<span>{content}?</span>
					</p>
					<p className={styles.desciption}>
						Это действие не может быть отменено.
						<br />
						Удалив{' '}
						{identificationType[type]?.string || 'неизвестный тип'},
						вы потеряете все внесенные данные.
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
						onClick={handleSubmit}
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

export default DeleteEntity;
