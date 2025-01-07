import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CheckRole from './hoc/CheckRole.jsx';
import UserMainLayout from './layouts/userMainLayout/UserMainLayout.jsx';
import AdminMainLayout from './layouts/adminMainLayout/AdminMainLayout.jsx';
import UniversalLayout from './layouts/universalLayout/UniversalLayout.jsx';
import CourseLayout from './layouts/courseLayout/CourseLayout.jsx';
import TopicLayout from './layouts/topicLayout/TopicLayout.jsx';
import Authentication from './pages/authentication/Authentication.jsx';
import Redirect from './pages/redirect/Redirect.jsx';
import AllCourses from './pages/allCourses/AllCourses.jsx';
import MyCourses from './pages/myCourses/MyCourses.jsx';
import CourseContent from './components/courseContent/CourseContent.jsx';
import CourseParticipants from './components/courseParticipants/CourseParticipants.jsx';
import './assets/styles/reset.css';
import './assets/styles/index.css';
import CourseGroup from './components/courseGroup/CourseGroup.jsx';
import UserCourseLayout from './layouts/userCourseLayout/UserCourseLayout.jsx';

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
				element: (
					<CheckRole
						adminLayer={<CourseLayout />}
						userLayer={<UserCourseLayout />}
					/>
				),
				children: [
					{
						path: ':topicId',
						element: <TopicLayout />,
						children: [
							{
								path: '',
								element: <CourseContent />,
							},
							{
								path: 'groups',
								element: <CourseGroup />,
							},
							{
								path: 'participants',
								element: <CourseParticipants />,
							},
						],
					},
				],
			},
		],
	},
]);

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
