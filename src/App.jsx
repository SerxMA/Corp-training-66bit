import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import Authentication from './pages/authentication/Authentication';
import UserMainLayout from './layouts/userMainLayout/UserMainLayout';
import UniversalLayout from './layouts/universalLayout/UniversalLayout';
import MyCourses from './pages/myCourses/MyCourses';
import AllCourses from './pages/allCourses/AllCourses';

import './assets/styles/reset.css';
import './assets/styles/index.css';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Authentication />,
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
				element: <UserMainLayout />,
				children: [
					{
						path: '',
						element: <Navigate to="/courses/my-courses" />,
					},
					{
						path: 'my-courses',
						element: <MyCourses />,
					},
					{
						path: 'all-courses',
						element: <AllCourses />,
					},
				],
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
