import { Outlet } from 'react-router-dom';

import { useAuth } from '../../customHooks/useAuth.js';
import AdminCourseTabs from '../../components/adminCourseTabs/AdminCourseTabs.jsx';

const TopicLayout = () => {
	const { role } = useAuth();

	return (
		<>
			{role === 'ADMIN' && <AdminCourseTabs />}
			<Outlet />
		</>
	);
};

export default TopicLayout;
