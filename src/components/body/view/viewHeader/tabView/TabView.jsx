import Filter from './filter/Filter';
import SearchField from './searchField/SearchField';
import styles from './TabView.module.css'
import ChangeView from './changeView/ChangeView'

const TabView = () => {

    return (
        <div className={styles['tab-view-wrapper']}>
            <div className={styles['tabs-wrapper']}>
                <button className={styles['tab']}>Мои курсы</button>
                <button className={styles['tab']}>Все курсы</button>
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