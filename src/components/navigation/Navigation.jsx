import NavigationCell from '../../UI/buttons/navigationCell/NavigationCell.jsx';
import styles from './Navigation.module.css';
import { navItems } from '../../helpers/constants/navItems.js';
import { useAuth } from '../../customHooks/useAuth.js';

const USER_LIST = ['courses', 'statement', 'analytics', 'certificates'];
const ADMIN_LIST = ['courses', 'statement', 'analytics', 'staff'];

const Navigation = () => {
	const { role } = useAuth();

	return (
		<nav className={styles['nav']}>
			<ul className={styles['nav__list']}>
				{[...(role === 'USER' ? USER_LIST : ADMIN_LIST)].map((item) => {
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
