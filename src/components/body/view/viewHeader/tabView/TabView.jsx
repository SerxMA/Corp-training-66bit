import { NavLink } from 'react-router-dom';

import Filter from './filter/Filter';
import SearchField from './searchField/SearchField';
import styles from './TabView.module.css';
import ChangeView from './changeView/ChangeView';

const TabView = () => {
	return (
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
				<SearchField />
				<ChangeView />
				<Filter />
			</div>
		</div>
	);
};

export default TabView;
