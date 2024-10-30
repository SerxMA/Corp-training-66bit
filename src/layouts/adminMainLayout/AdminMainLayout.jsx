import { Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation';
import styles from './AdminMainLayout.module.css'
import ViewHeaderAdmin from '../../components/viewHeaderAdmin/ViewHeaderAdmin';

const AdminMainLayout = () => {
    return (
        <>
    	<NavPanel />
      	<div className={styles['view-wrapper']}>
        	<ViewHeaderAdmin />
        	<ul className={styles['courses-wrapper']}>
        		<Outlet />
        	</ul>
      </div>
    </>
    );
};

export default AdminMainLayout;