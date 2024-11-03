import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { api } from '../../api';
import { setUser } from '../../store/actionCreators/user';

const Redirect = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const content = loading ? (
		<h1>Загрузка</h1>
	) : (
		<Navigate to={location.state?.from || '/'} />
	);

	useEffect(() => {
		api.user
			.getUserRole({})
			.then((res) => {
				dispatch(setUser(res.data));
			})
			.finally(() => setLoading(false));
	}, []);

	return <>{content}</>;
};

export default Redirect;
