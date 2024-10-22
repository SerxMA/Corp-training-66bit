import { NavLink } from 'react-router-dom';

const AllCourses = () => {
	return (
		<>
			<li>
				<p>All courses</p>
				<NavLink to={'/courses/my-courses'}>To my courses</NavLink>
			</li>
			<li>
				<p>All courses</p>
				<NavLink to={'/courses/my-courses'}>To my courses</NavLink>
			</li>
			<li>
				<p>All courses</p>
				<NavLink to={'/courses/my-courses'}>To my courses</NavLink>
			</li>
			<li>
				<p>All courses</p>
				<NavLink to={'/courses/my-courses'}>To my courses</NavLink>
			</li>
		</>
	);
};

export default AllCourses;
