import styles from './View.module.css'
import ViewHeader from './viewHeader/ViewHeader';

const View = () => {
    return (
        <div className={styles['view-wrapper']}>
            <ViewHeader />
        </div>
    );
};

export default View;