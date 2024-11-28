import { useEffect, useState } from 'react';

import { changeText } from '../../helpers/functions/formatText';
import styles from './TaskFreeformAnswer.module.css';

const MAX_CHARS = {
	answer: 256,
};

const TaskFreeformAnswer = ({ question }) => {
	const [file, setFile] = useState(null);
	const [answer, setAnswer] = useState('');

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	useEffect(() => {
		setAnswer(file ? `Выбранный файл: ${file.name}` : '');
	}, [file]);

	return (
		<>
			<p className={styles.question}>
				{question || 'Это тестовый вопрос ы?'}
			</p>
			<div className={styles['description-box']}>
				<textarea
					placeholder=""
					className={styles['description-area']}
					value={answer}
					onChange={(event) =>
						changeText(
							event.target.value,
							MAX_CHARS['answer'],
							(input) => setAnswer(input)
						)
					}
					maxLength={MAX_CHARS.answer}
					disabled={file}
				></textarea>
				<span>Ваш ответ</span>
				<div className={styles['char-counter']}>
					{answer.length} / {MAX_CHARS.answer}
				</div>
				{!file ? (
					<label className={styles.fileLabel}>
						<input
							type="file"
							className={styles.fileInput}
							onChange={handleFileChange}
						/>
						<svg
							className={styles.icon}
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M15.0007 6.99996L8.50068 13.5C8.10286 13.8978 7.87936 14.4374 7.87936 15C7.87936 15.5626 8.10286 16.1021 8.50068 16.5C8.8985 16.8978 9.43807 17.1213 10.0007 17.1213C10.5633 17.1213 11.1029 16.8978 11.5007 16.5L18.0007 9.99996C18.7963 9.20432 19.2433 8.12518 19.2433 6.99996C19.2433 5.87475 18.7963 4.79561 18.0007 3.99996C17.205 3.20432 16.1259 2.75732 15.0007 2.75732C13.8755 2.75732 12.7963 3.20432 12.0007 3.99996L5.50068 10.5C4.30721 11.6934 3.63672 13.3121 3.63672 15C3.63672 16.6878 4.30721 18.3065 5.50068 19.5C6.69415 20.6934 8.31285 21.3639 10.0007 21.3639C11.6885 21.3639 13.3072 20.6934 14.5007 19.5L21.0007 13"
								stroke="#8D8F91"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</label>
				) : (
					<div className={styles.cross} onClick={() => setFile(null)}>
						X
					</div>
				)}
			</div>
			<button
				className={`${styles['btn']} ${
					!answer ? styles['btn_disabled'] : styles['btn_success']
				}`}
				disabled={!answer}
			>
				Отправить
			</button>
		</>
	);
};

export default TaskFreeformAnswer;
