import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getModules } from '../../store/actions/modules.js';
import { getCourse } from '../../store/actions/course.js';
import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';
import styles from './CourseLayout.module.css'

const CourseLayout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		dispatch(getModules(courseId));
		dispatch(getCourse(courseId));
	}, []);

	return (
		<>
			<CourseStructure />
			<div className={styles['content-wrapper']}>
				<Outlet />
			</div>
		</>
	)
};

export default CourseLayout;
