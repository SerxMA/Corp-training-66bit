import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth';
import { removeUser } from '../../store/actionCreators/user';
import avatar from '../../assets/images/Avatar.jpg';
import styles from './UserPopup.module.css';

const UserPopup = ({ setOpen }) => {
	const dispatch = useDispatch();
	const { avatarUrl, username, email } = useAuth();

	const logout = (e) => {
		dispatch(removeUser());
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
			<img src={avatarUrl || avatar} alt="Аватар" />
			<div className={styles['user-info']}>
				<p>{username}</p>
				<p>{email}</p>
			</div>
			<svg
				onClick={logout}
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M14 8V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H12C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18V16M7 12H21M21 12L18 9M21 12L18 15"
					stroke="var(--content-disabled)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};

export default UserPopup;
