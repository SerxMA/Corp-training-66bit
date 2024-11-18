import { useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import styles from './ChangeName.module.css';

const MAX_CHARS = {
	title: 128,
};

// type ChangeNameProps = {
// 	setOpen: () => void;
// 	type: 'lesson' | 'module';
// 	content: undefined | String;
// }
const ChangeName = ({ setOpen, type, content }) => {
	const [title, setTitle] = useState(content ? content : '');

	const changeText = (text, method) => {
		const input = text
			.trimStart()
			.replace('  ', ' ')
			.replace(/[^\w\sА-Яа-яёЁ_,.()-]/g, '');

		if (input.length <= MAX_CHARS[method]) {
			setTitle(input);
		}
	};

	const titleContent = {
		lesson: `${content ? 'Редактировать' : 'Новый'} урок`,
		module: `${content ? 'Редактировать' : 'Новый'} модуль`,
	};

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>
						{titleContent[type] || 'Неизвестный тип'}
					</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['input-box']}>
						<input
							type="text"
							placeholder=" "
							required
							value={title}
							onChange={(e) =>
								changeText(e.target.value, 'title')
							}
						/>
						<span>Название</span>
					</div>
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
							title.length
								? styles.btn_success
								: styles.btn_disabled
						}`}
						disabled={!title.length}
					>
						Готово
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default ChangeName;
