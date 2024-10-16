import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Authentication from './pages/authentication/Authentication';
import Layout from './components/layout/Layout';
import UserMain from './pages/userMain/UserMain';

import './assets/styles/reset.css';
import './assets/styles/index.css';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Authentication />,
	},
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <UserMain />,
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
