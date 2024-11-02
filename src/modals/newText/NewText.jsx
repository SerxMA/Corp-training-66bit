import { useState } from 'react';

import Cross from '../Cross.jsx';
import styles from './NewText.module.css';

const NewText = () => {
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	return (
		<div className={styles['popup']}>
			<div className={styles['top-block']}>
				<h2 className={styles['title']}>Новый текст</h2>
				<button className={styles['cross']}>
					<Cross />
				</button>
			</div>
			<div className={styles['describe-block']}>
				<div className={styles['input-box']}>
					<input
						type="text"
						name="title"
						placeholder=" "
						required
						value={title}
						onChange={(e) =>
							setTitle(
								e.target.value.trimStart().replace('  ', ' ')
							)
						}
					/>
					<span>Заголовок</span>
				</div>
				<div className={styles['description-box']}>
					<textarea
						placeholder=" "
						className={styles['description-area']}
						required
						value={text}
						onChange={(e) =>
							setText(
								e.target.value.trimStart().replace('  ', ' ')
							)
						}
					></textarea>
					<span>Текст</span>
				</div>
			</div>
			<div className={styles['btn-wrapper']}>
				<button
					className={`${styles.btn} ${
						title.length && text.length
							? styles.btn_success
							: styles.btn_disabled
					}`}
					disabled={!(title.length && text.length)}
				>
					Готово
				</button>
			</div>
		</div>
	);
};

export default NewText;
