import NavItem from '../navItem/NavItem';

import styles from './NavPanel.module.css';

const USER_LIST = ['courses', 'statement', 'analytics', 'certificates'];
const ADMIN_LIST = ['courses', 'statement', 'analytics', 'staff'];

const NavPanel = () => {
	return (
		<div className={styles['nav-panel']}>
			<nav className={styles['nav']}>
				<ul className={styles['nav__list']}>
					{USER_LIST.map((item) => (
						<NavItem key={item} type={item} />
					))}
				</ul>
			</nav>
		</div>
	);
};

export default NavPanel;
