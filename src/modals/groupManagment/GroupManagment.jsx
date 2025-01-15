import { useEffect } from 'react';

import styles from './GroupManagment.module.css';
import CalendarTime from '../../UI/svg/calendarTime/CalendarTime.jsx';
import PersonGroup from '../../UI/svg/personGroup/PersonGroup.jsx';
import PersonGroupClose from '../../UI/svg/personGroupClose/PersonGroupClose.jsx';
import Trash from '../../UI/svg/trash/Trash.jsx';

const GroupManagment = ({ isTop, setOpen, config, defGroup = false }) => {
	const handleClick = (e, key) => {
		setOpen(0);
		config[key](true);
		e.stopPropagation();
	};

	useEffect(() => {
		const closePopup = () => setOpen(0);
		document.addEventListener('click', closePopup);

		return () => {
			document.removeEventListener('click', closePopup);
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
				<PersonGroup size="small" />
				Участники
			</button>
			{!defGroup && (
				<button onClick={(e) => handleClick(e, 'deadlines')}>
					<CalendarTime />
					Дедлайны
				</button>
			)}
			{!defGroup && (
				<button onClick={(e) => handleClick(e, 'trash')}>
					<Trash />
					Удалить
				</button>
			)}
			{!defGroup && (
				<button onClick={(e) => handleClick(e, 'trashExclude')}>
					<PersonGroupClose />
					Удалить и исключить
				</button>
			)}
		</div>
	);
};

export default GroupManagment;
