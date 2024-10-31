import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom'
import { useState, useEffect } from 'react';

import Authentication from './pages/authentication/Authentication.jsx';
import UserMainLayout from './layouts/userMainLayout/UserMainLayout.jsx';
import AdminMainLayout from './layouts/adminMainLayout/AdminMainLayout.jsx';
import UniversalLayout from './layouts/universalLayout/UniversalLayout.jsx';
import AllCourses from './pages/allCourses/AllCourses.jsx';
import MyCourses from './pages/myCourses/MyCourses.jsx';
import { getUserRole } from './api/makeRequest';

import './assets/styles/reset.css';
import './assets/styles/index.css';

const RoleBasedLayout = () => {

	const [role, setRole] = useState('');
	const [loading, setLoading] = useState(true);
	
	const content = loading ? <h1>Загрузка...</h1> : role === 'ADMIN' ? <AdminMainLayout /> : <UserMainLayout />

	useEffect(() => {
		getUserRole()
		.then( role => {
			setRole(role)
		})
		.finally(
			setLoading(false)
		)
	}, [])

	return (
		<>
			{content}
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
				element: <RoleBasedLayout />,
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
