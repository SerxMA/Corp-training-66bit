import { NavLink } from 'react-router-dom';

const MyCourses = () => {
	return (
		<ul>
			<li>
				<p>My courses</p>
				<NavLink to={'/courses/all-courses'}>To all courses</NavLink>
			</li>
		</ul>
	);
};

export default MyCourses;
