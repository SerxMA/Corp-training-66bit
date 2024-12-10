import { Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation.jsx';
import ViewHeaderAdmin from '../../components/viewHeaderAdmin/ViewHeaderAdmin.jsx';
import styles from './AdminMainLayout.module.css';

const AdminMainLayout = () => {
	return (
		<>
			<NavPanel />
			<div className={styles['view-wrapper']}>
				<ViewHeaderAdmin />
				<Outlet />
			</div>
		</>
	);
};

export default AdminMainLayout;
