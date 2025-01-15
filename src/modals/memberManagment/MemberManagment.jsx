import { useEffect } from 'react';

import styles from './MemberManagment.module.css';
import Edit from '../../UI/svg/edit/Edit.jsx';
import Trash from '../../UI/svg/trash/Trash.jsx';

const MemberManagment = ({ isTop, setOpen, config }) => {
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
			<button onClick={(e) => handleClick(e, 'relocate')}>
				<Edit />
				Переместить
			</button>
			<button onClick={(e) => handleClick(e, 'trash')}>
				<Trash />
				Исключить
			</button>
		</div>
	);
};

export default MemberManagment;
