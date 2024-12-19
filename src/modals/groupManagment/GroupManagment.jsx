import { useEffect } from 'react';

import PersonGroup from '../../UI/personGroup/PersonGroup.jsx';
import CalendarTime from '../../UI/calendarTime/CalendarTime.jsx';
import Trash from '../../UI/trash/Trash.jsx';
import PersonGroupClose from '../../UI/personGroupClose/PersonGroupClose.jsx';
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
				<PersonGroup />
				Участники
			</button>
			<button onClick={(e) => handleClick(e, 'deadlines')}>
				<CalendarTime />
				Дедлайны
			</button>
			<button onClick={(e) => handleClick(e, 'trash')}>
				<Trash />
				Удалить
			</button>
			<button onClick={(e) => handleClick(e, 'trashExclude')}>
				<PersonGroupClose />
				Удалить и исключить
			</button>
		</div>
	);
};

export default GroupManagment;
