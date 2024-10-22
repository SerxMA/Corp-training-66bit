import { Outlet } from 'react-router-dom';

import ViewHeader from './viewHeader/ViewHeader';

import styles from './View.module.css';

const View = () => {
	return (
		<div className={styles['view-wrapper']}>
			<ViewHeader />
			<ul className={styles['courses-wrapper']}>
				<Outlet />
			</ul>
		</div>
	);
};

export default View;
