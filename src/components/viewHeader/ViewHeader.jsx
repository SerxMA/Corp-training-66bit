import { NavLink } from 'react-router-dom';

import Filter from '../filter/Filter';
import ChangeView from '../changeView/ChangeView';
import SearchField from '../searchField/SearchField';
import styles from './ViewHeader.module.css'

const ViewHeader = () => {
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
                    <SearchField />
                    <ChangeView />
                    <Filter />
			    </div>
		    </div>
        </div>
    );
};

export default ViewHeader;