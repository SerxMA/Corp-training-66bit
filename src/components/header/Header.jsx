import styles from './Header.module.css'
import LogoBlock from './logoBlock/LogoBlock';
import HeaderMenu from './headerMenu/HeaderMenu';

const Header = () => {
    return (
        <div className={styles['header-wrapper']}>
            <LogoBlock/>
            <HeaderMenu />
        </div>
    );
};

export default Header;