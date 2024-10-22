import { NavLink } from 'react-router-dom';

const AllCourses = () => {
	return (
		<ul>
			<li>
				<p>All courses</p>
				<NavLink to={'/courses/my-courses'}>To my courses</NavLink>
			</li>
		</ul>
	);
};

export default AllCourses;
