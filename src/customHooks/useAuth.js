import { useSelector } from 'react-redux';

export const useAuth = () => {
	const { username, email, avatarUrl, role } = useSelector(
		(state) => state.user
	);

	return {
		isAuth: !!role,
		username,
		email,
		avatarUrl,
		role,
	};
};
