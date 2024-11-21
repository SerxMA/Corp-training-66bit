import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../api/index.js';
import { getCourses } from '../../store/actionCreators/courses.js';
import CourseCard from '../../components/courseCard/CourseCard.jsx';

const AllCourses = () => {
	const dispatch = useDispatch();
	const { courses } = useSelector((state) => state.courses);

	useEffect(() => {
		api.courses.getCourses({}).then((res) => {
			dispatch(getCourses({ courses: res.data }));
		});
	}, []);

	return (
		<>
			{courses.length > 0 &&
				courses.map((course) => (
					<CourseCard
						key={course.id}
						img={course?.pictureUrl}
						tags={course?.tags}
						title={course.title}
						id={course.id}
						description={course.description}
					/>
				))}
		</>
	);
};

export default AllCourses;
