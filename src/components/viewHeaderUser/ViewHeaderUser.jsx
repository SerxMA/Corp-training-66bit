import { NavLink } from 'react-router-dom';

import Filter from '../filter/Filter.jsx';
import SearchField from '../searchField/SearchField.jsx';
import styles from './ViewHeaderUser.module.css'

const ViewHeaderUser = () => {
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
                    <Filter />
			    </div>
		    </div>
        </div>
    );
};

export default ViewHeaderUser;