import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import ico from '../../assets/images/baseImg.png';
import Cross from '../Cross.jsx';
import styles from './ChooseFile.module.css';

const ChooseFile = ({ setOpen, type, position }) => {
	const [file, setFile] = useState(null);

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		setFile(droppedFile);
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	useEffect(() => {
		const closePopup = () => setOpen(false);
		document.body.style.overflowY = 'hidden';
		document.addEventListener('click', closePopup);

		return () => {
			document.removeEventListener('click', closePopup);
			document.body.style.overflowY = 'auto';
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>
						{type === 'photo' ? 'Новое фото' : 'Новое видео'}
					</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div
						className={`${styles['upload-container']} ${
							file ? styles['upload-container_succes'] : ''
						}`}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						<img src={ico} alt="Icon" />
						<div className={styles['input-wrapper']}>
							<p className={styles['upload-text']}>
								{file
									? file.name
									: type === 'photo'
									? 'Перетащите изображение сюда'
									: 'Перетащите видео сюда'}
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
						className={`${styles.btn} ${
							file ? styles.btn_success : styles.btn_disabled
						}`}
						disabled={!file}
					>
						Готово
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default ChooseFile;
