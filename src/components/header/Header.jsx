import LogoBlock from './components/logoBlock/LogoBlock';
import HeaderMenu from './components/headerMenu/HeaderMenu';

import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles['header-wrapper']}>
			<LogoBlock />
			<HeaderMenu />
		</div>
	);
};

export default Header;
