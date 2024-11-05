import { NavLink, Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation.jsx';
import ViewHeaderAdmin from '../../components/viewHeaderAdmin/ViewHeaderAdmin.jsx';
import styles from './AdminMainLayout.module.css';

const AdminMainLayout = () => {

    return (
        <>
    	<NavPanel />
      	<div className={styles['view-wrapper']}>
        	<ViewHeaderAdmin/>
        	<ul className={styles['courses-wrapper']}>
        		<Outlet />
				<NavLink to={'/course/2'}>course</NavLink>
        	</ul>
        </div>
    </>
    );
};

export default AdminMainLayout;