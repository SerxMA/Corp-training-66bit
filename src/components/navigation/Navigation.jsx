import NavigationCell from '../../UI/buttons/navigationCell/NavigationCell.jsx';
import styles from './Navigation.module.css';
import { navItems } from '../../helpers/constants/navItems.js';

const USER_LIST = ['courses', 'statement', 'analytics', 'certificates'];
const ADMIN_LIST = ['courses', 'statement', 'analytics', 'staff'];

const Navigation = () => {
	return (
		<nav className={styles['nav']}>
			<ul className={styles['nav__list']}>
				{USER_LIST.map((item) => {
					const { href, Icon, text, disabled } = navItems[item];
					return (
						<NavigationCell
							key={item}
							Icon={Icon}
							to={href}
							disabled={disabled}
						>
							{text}
						</NavigationCell>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
