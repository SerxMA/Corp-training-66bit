import { useEffect } from 'react';

import Trash from '../../UI/trash/Trash.jsx';
import Edit from '../../UI/edit/Edit.jsx';
import styles from './MemberManagment.module.css';

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
