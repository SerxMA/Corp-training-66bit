import Actions from './actions/Actions.jsx';
import avatar from '../../../assets/images/Avatar.jpg'
import styles from './HeaderMenu.module.css'

const HeaderMenu = () => {
    return (
        <div className={styles['header-actions']}>
            <button className={styles['avatar-btn']}>
                <img src={avatar} alt="Avatar"/>
            </button>
            <Actions />
        </div>
    );
};

export default HeaderMenu;