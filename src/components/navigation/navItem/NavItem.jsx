import { NavLink } from 'react-router-dom';

import Certificates from './icons/certificates/Certificates.jsx';
import ChartPie from './icons/chartPie/ChartPie.jsx';
import Grid from './icons/grid/Grid.jsx';
import Statement from './icons/statement/Statement.jsx';
import Staff from './icons/staff/Staff.jsx';
import styles from './NavItem.module.css';

const ITEM_TYPE = {
	courses: { href: '/courses', Icon: Grid, text: 'Курсы', disabled: false },
	statement: {
		href: '/statement',
		Icon: Statement,
		text: 'Ведомость',
		disabled: false,
	},
	analytics: { href: '#', Icon: ChartPie, text: 'Аналитика', disabled: true },
	certificates: {
		href: '#',
		Icon: Certificates,
		text: 'Сертификаты',
		disabled: true,
	},
	staff: {
		href: '#',
		Icon: Staff,
		text: 'Сотрудники',
		disabled: true,
	},
};

const NavItem = ({ type }) => {
	const { href, Icon, text, disabled } = ITEM_TYPE[type];

	return (
		<li className={styles['nav-item']}>
			<NavLink
				to={disabled ? undefined : href}
				className={() => (disabled ? styles['disabled-link'] : '')}
			>
				{({ isActive }) => (
					<>
						<Icon
							color={
								disabled
									? 'var(--content-disabled)'
									: isActive
									? 'var(--purple-main)'
									: undefined
							}
						/>
						<span
							style={{
								color: disabled
									? 'var(--content-disabled)'
									: isActive
									? 'var(--purple-main)'
									: undefined,
							}}
						>
							{text}
						</span>
						{disabled && (
							<span className={styles['soon-text']}>Скоро</span>
						)}
					</>
				)}
			</NavLink>
		</li>
	);
};

export default NavItem;
