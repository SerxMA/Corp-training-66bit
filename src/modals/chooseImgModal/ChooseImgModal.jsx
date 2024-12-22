/* eslint-disable react/prop-types */
import ico from '../../assets/images/baseImg.png';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
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
		selectedFile && changeData((cv) => ({ ...cv, file: selectedFile }));
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
								accept=".jpg, .png, jpeg"
								id="fileInput"
								style={{ display: 'none' }}
								onChange={handleFileChange}
							/>
						</label>
					</div>
				</div>
			</div>
			<div className={styles['btn-wrapper']}>
				<MainButton
					className={styles['half-parent']}
					type={'secondary'}
					onClick={onPrev}
				>
					{type ? 'Отмена' : 'Назад'}
				</MainButton>
				<MainButton
					className={styles['half-parent']}
					type={data.file ? 'primary' : 'disabled'}
					onClick={onNext}
					disabled={!data.file}
				>
					{type ? 'Готово' : 'Создать курс'}
				</MainButton>
			</div>
		</>
	);
};

export default ChooseImgModal;
