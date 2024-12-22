import basicAvatar from '../../assets/images/Avatar.jpg';
import styles from './ProfileInfoCard.module.css';

const ProfileInfoCard = ({
	avatar,
	username,
	email,
	onClick = () => {},
	size = 'medium',
}) => {
	return (
		<div className={styles['people-card']}>
			<img
				src={avatar}
				alt="Профиль"
				className={styles[size]}
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
