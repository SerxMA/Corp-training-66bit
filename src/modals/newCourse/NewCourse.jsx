import { useState } from 'react';

import Arrow from '../Arrow.jsx';
import Cross from '../Cross.jsx';
import styles from './NewCourse.module.css';

const NewCourse = () => {
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');

	const MAX_CHARS = {
		description: 360,
		title: 128,
	};

	const handleDescriptionChange = (event, maxChars, method) => {
		const input = event.target.value.trimStart().replace('  ', ' ');
		if (input.length <= maxChars) {
			method(input);
		}
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
				<div className={styles['input-box']}>
					<input
						type="text"
						name="title"
						placeholder=""
						className={styles['title-input']}
						value={title}
						onChange={(event) =>
							handleDescriptionChange(
								event,
								MAX_CHARS.title,
								setTitle
							)
						}
						maxLength={MAX_CHARS.title}
					/>
					<span>Название</span>
				</div>
				<div className={styles['description-box']}>
					<textarea
						placeholder=""
						className={styles['description-area']}
						value={description}
						onChange={(event) =>
							handleDescriptionChange(
								event,
								MAX_CHARS.description,
								setDescription
							)
						}
						maxLength={MAX_CHARS.description}
					></textarea>
					<span>Описание</span>
					<div className={styles['char-counter']}>
						{description.length} / {MAX_CHARS.description}
					</div>
				</div>
			</div>
			<button
				className={`${styles['continue-btn']}
                ${
					description.length && title.length
						? styles['btn_success']
						: styles['btn_disabled']
				} `}
				disabled={!(description.length && title.length)}
			>
				Продолжить
				<Arrow />
			</button>
		</div>
	);
};

export default NewCourse;
