import styles from './HeaderMenu.module.css'
import Actions from './actions/Actions';
import avatar from '../../../assets/images/Avatar.jpg'

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