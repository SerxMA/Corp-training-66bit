import { NavLink } from 'react-router-dom';

import styles from './NavigationCell.module.css';

const NavigationCell = ({ children, Icon, to, disabled }) => {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					isActive
						? `${styles['nav-link']} ${styles['current-link']}`
						: disabled
						? `${styles['nav-link']} ${styles['disabled-link']}`
						: styles['nav-link']
				}
				onClick={(e) => {
					if (disabled) {
						e.preventDefault();
					}
				}}
			>
				{!!Icon && <Icon className={styles.svg} />}
				{children}
				{!!disabled && (
					<span className={styles['soon-text']}>Скоро</span>
				)}
			</NavLink>
		</li>
	);
};

export default NavigationCell;
