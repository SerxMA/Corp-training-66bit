import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getModules } from '../../store/actions/modules.js';
import { getCourse } from '../../store/actions/course.js';
import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';

const CourseLayout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		dispatch(getModules(courseId));
		dispatch(getCourse(courseId));
	}, []);

	return <CourseStructure />;
};

export default CourseLayout;
