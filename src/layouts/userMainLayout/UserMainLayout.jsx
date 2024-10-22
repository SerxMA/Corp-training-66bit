import { Outlet } from 'react-router-dom';

import NavPanel from '../../components/navigation/Navigation';
import ViewHeader from '../../components/viewHeader/ViewHeader';
import styles from './UserMainLayout.module.css'

const UserMainLayout = () => {
  return (
    <>
    	<NavPanel />
      	<div className={styles['view-wrapper']}>
        	<ViewHeader />
        	<ul className={styles['courses-wrapper']}>
        		<Outlet />
        	</ul>
      </div>
    </>
  );
};

export default UserMainLayout;
