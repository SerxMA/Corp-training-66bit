import { useSelector } from 'react-redux';

export const useAuth = () => {
	const { id, username, email, avatarUrl, role } = useSelector(
		(state) => state.user
	);

	return {
		id,
		isAuth: !!role,
		username,
		email,
		avatarUrl,
		role,
	};
};
