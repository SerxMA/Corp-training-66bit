import { Outlet } from 'react-router-dom';

import Header from '../../components/header/Header.jsx';
import styles from './UniversalLayout.module.css';

const UniversalLayout = () => {
	return (
		<>
			<Header />
			<div className={styles.body}>
				<Outlet />
			</div>
		</>
	);
};

export default UniversalLayout;
