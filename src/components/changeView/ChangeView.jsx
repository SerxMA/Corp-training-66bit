import ViewIcon from './listView/ListView.jsx';
import styles from './ChangeView.module.css'

const ChangeView = () => {
    return (
        <button className={styles['rows-btn']}>
            <ViewIcon />
            Ряды
        </button>
    );
};

export default ChangeView;