import ico from '../../assets/images/danger.png';
import styles from './DeleteLesson.module.css';

const DeleteLesson = ({ lessonName }) => {
	return (
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
				<button className={`${styles.btn} ${styles.btn_cencel}`}>
					Отмена
				</button>
				<button className={`${styles['btn']} ${styles.btn_success}`}>
					Удалить
				</button>
			</div>
		</div>
	);
};

export default DeleteLesson;
