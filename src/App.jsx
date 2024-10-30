import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom'

import Authentication from './pages/authentication/Authentication';
import UserMainLayout from './layouts/userMainLayout/UserMainLayout';
import AdminMainLayout from './layouts/adminMainLayout/AdminMainLayout';
import UniversalLayout from './layouts/universalLayout/UniversalLayout';
import MyCourses from './pages/myCourses/MyCourses';
import AllCourses from './pages/allCourses/AllCourses';

import './assets/styles/reset.css';
import './assets/styles/index.css';

const RoleBasedLayout = ({role}) => {
	return (
		<>
			{role === 'admin'? <AdminMainLayout/> : <UserMainLayout/>}
		</>
	);
};

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
				element: <RoleBasedLayout role={'admin'} />,
				children: [
					{
						path: '',
						element: <Navigate to="/courses/all-courses" />,
					},
					{
						path: 'all-courses',
						element: <AllCourses />,
					},
					{
						path: 'my-courses',
						element: <MyCourses />,
					},
				],
			},
			// {
			// 	path: 'courses/',
			// 	element: <UserMainLayout />,
			// 	children: [
			// 		{
			// 			path: '',
			// 			element: <Navigate to="/courses/my-courses" />,
			// 		},
			// 		{
			// 			path: 'all-courses',
			// 			element: <AllCourses />,
			// 		},
			// 		{
			// 			path: 'my-courses',
			// 			element: <MyCourses />,
			// 		},
			// 	],
			// },
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
