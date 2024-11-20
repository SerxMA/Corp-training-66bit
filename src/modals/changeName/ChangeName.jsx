import { useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import styles from './ChangeName.module.css';
import { api } from '../../api/index.js';

const MAX_CHARS = {
	title: 128,
};

const ChangeName = ({ setOpen, type, content, setIsDataChanged, position, id }) => {
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

	const apiEntities = {
		lesson: api['lessons'].editLesson,
		module: api['modules'].editModule
	}

	const action = content ? 'PUT' : 'POST';

	const data = {
		title: title,
		position: position
	}

	const createEntity = async () => {
		const config = {
			method: action,
			data: data,
		}
		if (!content) {
			config.params = type === 'lesson' ? {moduleId: id} : {courseId: window.location.pathname.match(/\/course\/(\d+)/)[1]}
		}
		else {
			config.url = `/${type === 'lesson' ? id : id}`
		}

		apiEntities[type](config)
		.then((res) => {
			if (res.status === 201 || res.status === 200) {
				setIsDataChanged(true);
				setOpen(false);
			}
		});
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
						onClick={createEntity}
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
