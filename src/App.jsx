import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import Authentication from './pages/authentication/Authentication';
import UserMain from './pages/userMain/UserMain';
import Layout from './components/layout/Layout';
import MyCourses from './components/myCourses/MyCourses';
import AllCourses from './components/allCourses/AllCourses';

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
		element: <Layout />,
		children: [
			{
				path: 'courses/',
				element: <UserMain />,
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
