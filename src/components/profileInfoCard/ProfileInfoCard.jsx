import basicAvatar from '../../assets/images/Avatar.jpg';
import styles from './ProfileInfoCard.module.css';

const ProfileInfoCard = ({ avatar, username, email, onClick }) => {
	// этот компонент можно использовать для модалки AddPeoplePopup, может быть ¯\_(ツ)_/¯
	return (
		<div className={styles['people-card']}>
			<img
				src={avatar}
				alt="Профиль"
				onClick={onClick}
				onError={(e) => {
					e.currentTarget.src = basicAvatar;
				}}
			/>
			<div className={styles['people-info']}>
				<p>{username}</p>
				<p>{email}</p>
			</div>
		</div>
	);
};

export default ProfileInfoCard;
