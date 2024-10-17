import avatar from './img/Avatar.jpg';

import styles from './Avatar.module.css';

const Avatar = () => {
	return (
		<button className={styles['avatar-btn']}>
			<img src={avatar} alt="Avatar" />
		</button>
	);
};

export default Avatar;
