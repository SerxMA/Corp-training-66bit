import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { changeText } from '../../helpers/functions/formatText.js';
import Filter from '../filter/Filter.jsx';
// import SearchField from '../searchField/SearchField.jsx';
import styles from './ViewHeaderUser.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import LayoutList from '../../UI/svg/layoutList/LayoutList.jsx';
import SearchInputSmall from '../../UI/inputs/searchInputSmall/SearchInputSmall.jsx';
import Tooltip from '../../UI/other/tooltip/Tooltip.jsx';

const ViewHeaderUser = () => {
	const [search, setSearch] = useState('');

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
					{/* <SearchField /> */}
					<SearchInputSmall
						value={search}
						onChange={(e) =>
							changeText(e.target.value, 512, (text) =>
								setSearch(text)
							)
						}
						inProgress
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
