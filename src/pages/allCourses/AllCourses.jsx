import { useEffect, useState } from 'react';

import CourseCard from '../../components/courseCard/CourseCard.jsx';
import { api } from '../../api/index.js';

const AllCourses = () => {
	const [courses, setCourses] = useState([]);

	console.log(courses);

	useEffect(() => {
		api.courses.getAllCourses({}).then((res) => {
			setCourses(res.data);
		});
	}, []);

	return (
		<>
			{courses.length > 0 &&
				courses.map((course, index) => (
					<CourseCard
						key={index}
						img={course?.pictureUrl}
						tags={course?.tags}
						title={course.title}
						description={course.description}
					/>
				))}
		</>
	);
};

export default AllCourses;
