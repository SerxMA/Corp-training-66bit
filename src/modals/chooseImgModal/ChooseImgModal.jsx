/* eslint-disable react/prop-types */
import ico from '../../assets/images/baseImg.png';
import styles from './ChooseImgModal.module.css';

const ChooseImgModal = ({ onPrev, onNext, changeData, data, type }) => {
	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		changeData((cv) => ({ ...cv, file: droppedFile }));
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		changeData((cv) => ({ ...cv, file: selectedFile }));
	};

	return (
		<>
			<div className={styles['describe-block']}>
				<p className={styles.explanation}>
					Установите иллюстрацию
					<br />
					<span>Она будет отображаться на карточке курса</span>
				</p>
				<div
					className={`${styles['upload-container']} ${
						data.file ? styles['upload-container_succes'] : ''
					}`}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<img src={ico} alt="Icon" />
					<div className={styles['input-wrapper']}>
						<p className={styles['upload-text']}>
							{data.file
								? data.file.name
								: 'Перетащите сюда файл'}
						</p>
						<span className={styles.separator}>или</span>
						<label className={styles['upload-button']}>
							Выберите файл
							<input
								type="file"
								id="fileInput"
								style={{ display: 'none' }}
								onChange={handleFileChange}
							/>
						</label>
					</div>
				</div>
			</div>
			<div className={styles['btn-wrapper']}>
				<button
					className={`${styles.btn} ${styles.btn_cancel}`}
					onClick={onPrev}
				>
					{type ? 'Отмена' : 'Назад'}
				</button>
				<button
					className={`${styles.btn} ${
						data.file ? styles.btn_success : styles.btn_disabled
					}`}
					disabled={!data.file}
					onClick={onNext}
				>
					{type ? 'Готово' : 'Создать курс'}
				</button>
			</div>
		</>
	);
};

export default ChooseImgModal;
