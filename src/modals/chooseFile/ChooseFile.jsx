import { useState } from 'react';

import Cross from './icons/cross/Cross.jsx';
import ico from '../../assets/images/baseImg.png';
import styles from './ChooseFile.module.css';

const ChooseFile = () => {
	const [file, setFile] = useState(null);
	const [dragOver, setDragOver] = useState(false);

	console.log(file, 'file');
	console.log(dragOver, 'dragOver');

	const handleDragOver = (e) => {
		e.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = () => {
		setDragOver(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setDragOver(false);
		const droppedFile = e.dataTransfer.files[0];
		setFile(droppedFile);
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	return (
		<div className={styles['popup']}>
			<div className={styles['top-block']}>
				<h2 className={styles['title']}>Новый курс</h2>
				<button className={styles['cross']}>
					<Cross />
				</button>
			</div>
			<div className={styles['describe-block']}>
				<p className={styles.explanation}>
					Установите иллюстрацию
					<br />
					<span>Она будет отображаться на карточке курса</span>
				</p>
				<div
					className={styles['upload-container']}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<img src={ico} alt="Icon" />
					<div className={styles['input-wrapper']}>
						<p className="upload-text">
							{file ? file.name : 'Перетащите сюда файл'}
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
				<button className={`${styles.btn} ${styles.btn_cencel}`}>
					Назад
				</button>
				<button
					className={`${styles.btn} ${
						file ? styles.btn_success : styles.btn_disabled
					}`}
					disabled={!!file}
				>
					Продолжить
				</button>
			</div>
		</div>
	);
};

export default ChooseFile;
