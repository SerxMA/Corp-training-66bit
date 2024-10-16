import { Outlet } from 'react-router-dom';

import Header from '../header/Header';

import styles from './Layout.module.css';

const Layout = () => {
	return (
		<>
			<Header />
			<div className={styles.body}>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
