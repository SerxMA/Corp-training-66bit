import HeaderMenu from './headerMenu/HeaderMenu.jsx';
import BitLogo from './bitLogo/BitLogo.jsx'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles['header-wrapper']}>
            <div className={styles['logo-block']}>
                <BitLogo />
            </div>
            <HeaderMenu />
        </div>
    );
};

export default Header;