import FilterIcon from './filterIcon/FilterIcon.jsx';
import styles from './Filter.module.css'

const Filter = () => {
    return (
        <button className={styles['filter-btn']}>
            <FilterIcon />
        </button>
    );
};

export default Filter;