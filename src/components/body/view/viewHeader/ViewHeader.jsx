import SearchField from './searchField/SearchField';
import styles from './ViewHeader.module.css'
import Filter from './filter/Filter'

const ViewHeader = () => {
    return (
        <div className={styles['view-header-wrapper']}>
            <SearchField />
            <Filter />
        </div>
    );
};

export default ViewHeader;