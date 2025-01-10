import { useEffect, useState } from 'react';
import {
	NavLink,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

import { changeText } from '../../helpers/functions/formatText.js';
import Filter from '../filter/Filter.jsx';
import styles from './ViewHeaderUser.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import LayoutList from '../../UI/svg/layoutList/LayoutList.jsx';
import SearchInputSmall from '../../UI/inputs/searchInputSmall/SearchInputSmall.jsx';
import Tooltip from '../../UI/other/tooltip/Tooltip.jsx';

const ViewHeaderUser = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [search, setSearch] = useState('');

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (
				location.pathname.includes('all-courses') ||
				location.pathname.includes('my-courses')
			) {
				search.length
					? navigate(`${location.pathname}?page=1&title=${search}`)
					: navigate(
							`${location.pathname}?page=${searchParams.get(
								'page'
							)}`
					  );
			}
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [search]);

	return (
		<div className={styles['view-header-wrapper']}>
			<div className={styles['tab-view-wrapper']}>
				<div className={styles['tabs-wrapper']}>
					<NavLink
						to={'/courses/my-courses'}
						className={({ isActive }) =>
							isActive
								? `${styles.tab} ${styles['active-tab']}`
								: styles.tab
						}
					>
						Мои курсы
					</NavLink>
					<NavLink
						to={'/courses/all-courses'}
						className={({ isActive }) =>
							isActive
								? `${styles.tab} ${styles['active-tab']}`
								: styles.tab
						}
					>
						Все курсы
					</NavLink>
				</div>
				<div className={styles['buttons']}>
					<SearchInputSmall
						value={search}
						onChange={(e) =>
							changeText(e.target.value, 512, (text) =>
								setSearch(text)
							)
						}
					/>
					<Filter />
					<MainButton
						className={styles['temp-tooltip']}
						type={'light'}
						size={'small'}
					>
						<LayoutList />
						Ряды
						<Tooltip />
					</MainButton>
				</div>
			</div>
		</div>
	);
};

export default ViewHeaderUser;
