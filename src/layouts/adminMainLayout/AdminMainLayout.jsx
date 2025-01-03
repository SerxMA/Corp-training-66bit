import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resetCourses } from '../../store/actionCreators/courses.js';
import NavPanel from '../../components/navigation/Navigation.jsx';
import ViewHeaderAdmin from '../../components/viewHeaderAdmin/ViewHeaderAdmin.jsx';
import styles from './AdminMainLayout.module.css';

const AdminMainLayout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => dispatch(resetCourses);
	}, []);
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
