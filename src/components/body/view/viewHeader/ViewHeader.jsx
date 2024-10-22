import TabView from './tabView/TabView';
import styles from './ViewHeader.module.css'

const ViewHeader = () => {
    return (
        <div className={styles['view-header-wrapper']}>
            <TabView />
        </div>
    );
};

export default ViewHeader;