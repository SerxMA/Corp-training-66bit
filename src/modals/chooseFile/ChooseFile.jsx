import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postContents } from '../../store/actions/contents.js';
import ico from '../../assets/images/baseImg.png';
import Cross from '../Cross.jsx';
import styles from './ChooseFile.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';

const ChooseFile = ({ setOpen, type, position, data }) => {
	const dispatch = useDispatch();
	const { isError, isLoading } = useSelector((state) => state.contents);
	const [file, setFile] = useState(null);
	const [clickCompleted, setClickCompleted] = useState(false); // пока будет так

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

	const handleSubmit = () => {
		const content = {
			title: 'Это заглушка title',
			position: position,
			type: type === 'photo' ? 'PICTURE' : 'VIDEO',
			description: 'Это заглушка description',
		};
		const contentBlob = new Blob([JSON.stringify(content)], {
			type: 'application/json; charset=UTF-8',
		});
		console.log(content);

		const formData = new FormData();
		formData.append('content', contentBlob);
		formData.append('file', file);

		const topicId =
			window.location.pathname.match(/\/course\/\d+\/(\d+)/)[1];
		const config = {
			data: formData,
		};
		if (data) {
			config.url = data.id;
			// dispatch(putContents(topicId, config)).then(() => {
			// 	setClickCompleted(true);
			// });
		} else {
			config.params = { topicId: topicId };
			dispatch(postContents(topicId, config)).then(() => {
				setClickCompleted(true);
			});
		}
	};

	useEffect(() => {
		clickCompleted && !isError && !isLoading && setOpen(false);
	}, [clickCompleted, isError, isLoading]);

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
									accept={
										type === 'photo'
											? '.jpg, .png, jpeg'
											: '.mp4, .avi, .webm, .ogg, .quicktime'
									}
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
						onClick={handleSubmit}
						type={file ? 'primary' : 'disabled'}
						disabled={!file}
					>
						Готово
					</MainButton>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default ChooseFile;
