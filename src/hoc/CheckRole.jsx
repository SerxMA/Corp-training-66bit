import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../customHooks/useAuth';

const CheckRole = ({ adminLayer, userLayer }) => {
	const location = useLocation();
	const { isAuth, role } = useAuth();

	const defineRole = () => {
		switch (role) {
			case 'ADMIN':
				return adminLayer;

			case 'USER':
				return userLayer;

			default:
				return <h1>Неизвестная роль! Обратитесь в службу поддержки</h1>;
		}
	};

	const content = isAuth ? (
		defineRole()
	) : (
		<Navigate to="/auth" state={{ from: location.pathname }} />
	);

	return content;
};

export default CheckRole;
