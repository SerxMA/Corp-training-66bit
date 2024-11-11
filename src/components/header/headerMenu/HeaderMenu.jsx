import { useState } from 'react';

import { useAuth } from '../../../customHooks/useAuth.js';
import UserPopup from '../../../modals/userPopup/UserPopup.jsx';
import Actions from './actions/Actions.jsx';
import avatar from '../../../assets/images/Avatar.jpg';
import styles from './HeaderMenu.module.css';

const HeaderMenu = () => {
	const { avatarUrl } = useAuth();
	const [showPopup, setShowPopup] = useState(false);

	return (
		<div className={styles['header-actions']}>
			{showPopup && <UserPopup setOpen={setShowPopup} />}
			<button
				className={styles['avatar-btn']}
				onClick={(e) => {
					setShowPopup((cv) => !cv);
					e.stopPropagation();
				}}
			>
				<img src={avatarUrl || avatar} alt="Avatar" />
			</button>
			<Actions />
		</div>
	);
};

export default HeaderMenu;
