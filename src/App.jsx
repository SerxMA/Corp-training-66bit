import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import { useAuth } from './customHooks/useAuth.js';
import Authentication from './pages/authentication/Authentication.jsx';
import Redirect from './pages/redirect/Redirect.jsx';
import UserMainLayout from './layouts/userMainLayout/UserMainLayout.jsx';
import AdminMainLayout from './layouts/adminMainLayout/AdminMainLayout.jsx';
import UniversalLayout from './layouts/universalLayout/UniversalLayout.jsx';
import AllCourses from './pages/allCourses/AllCourses.jsx';
import MyCourses from './pages/myCourses/MyCourses.jsx';

import './assets/styles/reset.css';
import './assets/styles/index.css';

const RoleBasedLayout = () => {
	const { role } = useAuth();
	// Добавить проверку на isAuth

	let content = <h1>тут должна быть 404 страница))</h1>;
	switch (role) {
		case 'ADMIN':
			content = <AdminMainLayout />;
			break;

		case 'USER':
			content = <UserMainLayout />;
			break;

		default:
			break;
	}

	return <>{content}</>;
};

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
