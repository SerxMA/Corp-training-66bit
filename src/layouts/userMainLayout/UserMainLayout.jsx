import { Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation.jsx';
import ViewHeaderUser from '../../components/viewHeaderUser/ViewHeaderUser.jsx';
import styles from './UserMainLayout.module.css';

const UserMainLayout = () => {
	return (
		<>
			<NavPanel />
			<div className={styles['view-wrapper']}>
				<ViewHeaderUser />
				<Outlet />
			</div>
		</>
	);
};

export default UserMainLayout;
