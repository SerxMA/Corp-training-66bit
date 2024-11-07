import { useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import styles from './NewGroup.module.css';

const MAX_CHARS = {
	group: 50,
};

const NewGroup = ({ setOpen }) => {
	const [group, setGroup] = useState('');

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новая группа</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['group-box']}>
						<input
							type="text"
							placeholder=""
							className={styles['group-input']}
							value={group}
							onChange={(e) =>
								e.target.value.length <= MAX_CHARS.group &&
								setGroup(
									e.target.value
										.trimStart()
										.replace('  ', ' ')
								)
							}
							maxLength={MAX_CHARS.group}
						/>
						<span>Название</span>
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<button
						className={`${styles.btn} ${styles.btn_cancel}`}
						onClick={() => setOpen(false)}
					>
						Отмена
					</button>
					<button
						className={`${styles['btn']} ${
							group
								? styles['btn_success']
								: styles['btn_disabled']
						}`}
						disabled={!group}
					>
						Создать
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default NewGroup;
