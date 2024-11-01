import { Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation.jsx';
import ViewHeaderAdmin from '../../components/viewHeaderAdmin/ViewHeaderAdmin.jsx';
import NewCourse from '../../modals/newCourse/NewCourse.jsx';
import styles from './AdminMainLayout.module.css'
<<<<<<< HEAD
=======
import ViewHeaderAdmin from '../../components/viewHeaderAdmin/ViewHeaderAdmin';
import NewCourse from '../../modals/newCourse/NewCourse';
>>>>>>> feature/new-courses

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