import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth';
import { removeUser } from '../../store/actionCreators/user';
import styles from './UserPopup.module.css';
import { api } from '../../api';
import ProfileInfoCard from '../../components/profileInfoCard/ProfileInfoCard.jsx';
import LogOut from '../../UI/svg/logOut/LogOut.jsx';

const UserPopup = ({ setOpen }) => {
	const dispatch = useDispatch();
	const { avatarUrl, username, email } = useAuth();

	const logout = (e) => {
		dispatch(removeUser());
		api.user.removeUser({});
		e.stopPropagation();
	};

	useEffect(() => {
		const closePopup = () => setOpen(false);
		document.addEventListener('click', closePopup);

		return () => {
			document.removeEventListener('click', closePopup);
		};
	}, []);

	return (
		<div className={styles.popup} onClick={(e) => e.stopPropagation()}>
			<ProfileInfoCard
				avatar={avatarUrl}
				username={username}
				email={email}
				size={'big'}
			/>
			<LogOut onClick={logout} />
		</div>
	);
};

export default UserPopup;
