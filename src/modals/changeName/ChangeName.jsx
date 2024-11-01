import { useState } from 'react';

import Cross from './icons/Cross.jsx';
import styles from './ChangeName.module.css';

const ChangeName = () => {
	const [name, setName] = useState('');

	return (
		<div className={styles['popup']}>
			<div className={styles['top-block']}>
				<h2 className={styles['title']}>Новый урок</h2>
				<button className={styles['cross']}>
					<Cross />
				</button>
			</div>
			<div className={styles['input-box']}>
				<input
					type="text"
					name="title"
					placeholder=" "
					required
					value={name}
					onChange={(e) =>
						setName(e.target.value.trimStart().replace('  ', ' '))
					}
				/>
				<span>Название</span>
			</div>
			<div className={styles['btn-wrapper']}>
				<button className={`${styles.btn} ${styles.btn_cencel}`}>
					Отмена
				</button>
				<button
					className={`${styles['btn']} ${
						name.length ? styles.btn_success : styles.btn_disabled
					}`}
					disabled={!name.length}
				>
					Готово
				</button>
			</div>
		</div>
	);
};

export default ChangeName;
