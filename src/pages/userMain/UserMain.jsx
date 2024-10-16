import NavPanel from '../../components/navPanel/NavPanel';
import styles from './UserMain.module.css';

const UserMain = () => {
	return (
		<div className={styles['user-main']}>
			<NavPanel />
			<h1>poka tyt zaglyshka</h1>
		</div>
	);
};

export default UserMain;
