import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import Authentication from './pages/authentication/Authentication.jsx';
import Redirect from './pages/redirect/Redirect.jsx';
import UserMainLayout from './layouts/userMainLayout/UserMainLayout.jsx';
import AdminMainLayout from './layouts/adminMainLayout/AdminMainLayout.jsx';
import UniversalLayout from './layouts/universalLayout/UniversalLayout.jsx';
import AllCourses from './pages/allCourses/AllCourses.jsx';
import MyCourses from './pages/myCourses/MyCourses.jsx';
import CheckRole from './hoc/CheckRole.jsx';
import CurrentCourse from './pages/currentCourse/CurrentCourse.jsx';
import './assets/styles/reset.css';
import './assets/styles/index.css';
import CourseLayout from './layouts/courseLayout/CourseLayout.jsx';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Authentication />,
	},
	{
		path: '/redirect',
		element: <Redirect />,
	},
	{
		path: '/main',
		element: <Navigate to="/courses" />,
	},
	{
		path: '',
		element: <Navigate to="/courses" />,
	},
	{
		path: '/',
		element: <UniversalLayout />,
		children: [
			{
				path: 'courses/',
				element: (
					<CheckRole
						adminLayer={<AdminMainLayout />}
						userLayer={<UserMainLayout />}
					/>
				),
				children: [
					{
						path: '',
						element: <Navigate to="/courses/all-courses" />,
					},
					{
						path: 'all-courses/',
						element: <AllCourses />,
					},
					{
						path: 'my-courses',
						element: <MyCourses />,
					},
				],
			},
			{
				path: 'course/:id',
				element: <CourseLayout />
			},
		],
	},
]);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
