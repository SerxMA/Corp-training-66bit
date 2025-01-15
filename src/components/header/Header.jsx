import { NavLink } from 'react-router-dom';

import HeaderMenu from './headerMenu/HeaderMenu.jsx';
import LogoGrowIT from '../../UI/svg/logoGrowIT/LogoGrowIT.jsx';
import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles['header-wrapper']}>
			<NavLink to={'/courses'} className={styles['logo-block']}>
				<LogoGrowIT />
			</NavLink>
			<HeaderMenu />
		</div>
	);
};

export default Header;
