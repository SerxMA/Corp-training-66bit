import { useEffect } from 'react';

import Trash from '../../UI/trash/Trash.jsx';
import styles from './GroupManagment.module.css';

const GroupManagment = ({ isTop, setOpen, config }) => {
	const handleClick = (e, key) => {
		setOpen(0);
		config[key](true);
		e.stopPropagation();
	};

	useEffect(() => {
		const closePopup = () => setOpen(0);
		document.body.style.overflowY = 'hidden';
		document.addEventListener('click', closePopup);

		return () => {
			document.removeEventListener('click', closePopup);
			document.body.style.overflowY = 'auto';
		};
	}, []);
	return (
		<div
			className={`${styles['drop-down']} ${
				isTop ? styles['position-top'] : ''
			}`}
			onClick={(e) => e.stopPropagation()}
		>
			<button onClick={(e) => handleClick(e, 'participants')}>
				<Trash />
				Участники
			</button>
			<button onClick={(e) => handleClick(e, 'deadlines')}>
				<Trash />
				Дедлайны
			</button>
			<button onClick={(e) => handleClick(e, 'trash')}>
				<Trash />
				Удалить
			</button>
			<button onClick={(e) => handleClick(e, 'trashExclude')}>
				<Trash />
				Удалить и исключить
			</button>
		</div>
	);
};

export default GroupManagment;
