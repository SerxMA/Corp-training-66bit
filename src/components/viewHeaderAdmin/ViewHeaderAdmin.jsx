import { NavLink } from 'react-router-dom';

import Filter from '../filter/Filter.jsx';
import SearchField from '../searchField/SearchField.jsx';
import NewCourseBtn from '../newCourseBtn/NewCourseBtn.jsx';
import styles from './ViewHeaderAdmin.module.css'

const ViewHeaderAdmin = () => {
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
                    <SearchField />
                    <Filter />
                    <NewCourseBtn />
			    </div>
		    </div>
        </div>
    );
};

export default ViewHeaderAdmin;