import styles from './Filter.module.css'
import FilterIcon from './filterIcon/FilterIcon';

const Filter = () => {
    return (
        <div className={styles['filter-btn-wrapper']}>
            <button className={styles['filter-btn']}>
                <FilterIcon />
                Добавить фильтр
            </button>
        </div>
    );
};

export default Filter;