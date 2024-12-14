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