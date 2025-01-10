import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import Filter from '../filter/Filter.jsx';
import NewCourseBtn from '../newCourseBtn/NewCourseBtn.jsx';
import styles from './ViewHeaderAdmin.module.css';
import SearchInputSmall from '../../UI/inputs/searchInputSmall/SearchInputSmall.jsx';
import { changeText } from '../../helpers/functions/formatText.js';

const ViewHeaderAdmin = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [search, setSearch] = useState('');

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			search.length
				? navigate(`/courses/all-courses?page=1&title=${search}`)
				: navigate(
						`/courses/all-courses?page=${searchParams.get('page')}`
				  );
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [search]);

	return (
		<div className={styles['view-header-wrapper']}>
			<div className={styles['tab-view-wrapper']}>
				<div className={styles['tabs-wrapper']}>
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="2"
						height="22"
						viewBox="0 0 2 22"
						fill="none"
					>
						<path
							d="M1 21L1 1"
							stroke="#E5E5E6"
							strokeLinecap="round"
						/>
					</svg>
					<NewCourseBtn />
				</div>
			</div>
		</div>
	);
};

export default ViewHeaderAdmin;
