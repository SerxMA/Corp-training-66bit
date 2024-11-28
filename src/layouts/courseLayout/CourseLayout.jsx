import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { getModules } from '../../store/actions/modules.js';
import { getCourse } from '../../store/actions/course.js';
import { resetCourse } from '../../store/actionCreators/course.js';
import { resetModules } from '../../store/actionCreators/modules.js';
import { resetContents } from '../../store/actionCreators/contents.js';
import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';
import styles from './CourseLayout.module.css';

const CourseLayout = () => {
	const { modules } = useSelector((state) => state.modules);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		dispatch(getModules(courseId));
		dispatch(getCourse(courseId));

		return () => {
			dispatch(resetModules());
			dispatch(resetCourse());
			dispatch(resetContents());
		};
	}, []);

	useEffect(() => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		const topicId =
			window.location.pathname.match(/\/course\/\d+\/(\d+)/)?.[1];

		if (!topicId && modules.length) {
			const topicModule = modules.find((module) => module.topics.length);
			topicModule &&
				navigate(`/course/${courseId}/${topicModule.topics[0].id}`);
		}
	}, [modules]);

	return (
		<>
			<CourseStructure />
			<div className={styles['content-wrapper']}>
				<Outlet />
			</div>
		</>
	);
};

export default CourseLayout;
