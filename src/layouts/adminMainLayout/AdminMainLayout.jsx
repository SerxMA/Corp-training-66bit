import { Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation';
import styles from './AdminMainLayout.module.css'
import ViewHeaderAdmin from '../../components/viewHeaderAdmin/ViewHeaderAdmin';
import NewCourse from '../../modals/newCourse/NewCourse';

const AdminMainLayout = () => {
    return (
        <>
    	<NavPanel />
      	<div className={styles['view-wrapper']}>
        	<ViewHeaderAdmin />
        	<ul className={styles['courses-wrapper']}>
				<NewCourse />
        		<Outlet />
        	</ul>
      </div>
    </>
    );
};

export default AdminMainLayout;