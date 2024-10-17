// import Search from './search/Search';
import Loupe from './searchField/loupe/Loupe';
import SearchField from './searchField/SearchField';
import styles from './ViewHeader.module.css'

const ViewHeader = () => {
    return (
        <div className={styles['view-header-wrapper']}>
            <SearchField />
        </div>
    );
};

export default ViewHeader;