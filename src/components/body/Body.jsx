import NavPanel from './navigation/navPanel/NavPanel';
import View from './view/View';
import styles from './Body.module.css'

const Body = () => {
    return (
        <div className={styles['content-wrapper']}>
            <NavPanel />
            <View />
        </div>
    );
};

export default Body;