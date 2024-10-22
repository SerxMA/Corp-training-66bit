import styles from './Header.module.css'
import HeaderMenu from './headerMenu/HeaderMenu';
import BitLogo from './bitLogo/BitLogo'

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