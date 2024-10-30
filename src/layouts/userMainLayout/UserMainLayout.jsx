import { Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation';
import styles from './UserMainLayout.module.css'
import ViewHeaderUser from '../../components/viewHeaderUser/ViewHeaderUser';

const UserMainLayout = () => {
  return (
    <>
    	<NavPanel />
      	<div className={styles['view-wrapper']}>
        	<ViewHeaderUser />
        	<ul className={styles['courses-wrapper']}>
        		<Outlet />
        	</ul>
      </div>
    </>
  );
};

export default UserMainLayout;
