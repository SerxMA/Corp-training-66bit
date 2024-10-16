import Certificates from './icons/certificates/Certificates';
import ChartPie from './icons/chartPie/ChartPie';
import Grid from './icons/grid/Grid';
import Statement from './icons/statement/Statement';
import Staff from './icons/staff/Staff';

import styles from './NavItem.module.css';

const ITEM_TYPE = {
	courses: { href: '', Icon: Grid, text: 'Курсы', disabled: false },
	statement: {
		href: '',
		Icon: Statement,
		text: 'Ведомость',
		disabled: false,
	},
	analytics: { href: '#', Icon: ChartPie, text: 'Аналитика', disabled: true },
	certificates: {
		href: '#',
		Icon: Certificates,
		text: 'Сертиифкаты',
		disabled: false,
	},
	staff: {
		href: '#',
		Icon: Staff,
		text: 'Сотрудники',
		disabled: true,
	},
};

const NavItem = ({ type }) => {
	const loction = true; //Заглушка
	const { href, Icon, text, disabled } = ITEM_TYPE[type];

	return (
		<li className={styles['nav-item']}>
			<a
				href={disabled ? undefined : href}
				className={disabled ? styles['disabled-link'] : ''}
			>
				<Icon
					color={
						disabled
							? 'var(--content-disabled)'
							: loction
							? 'var(--purple-main)'
							: undefined
					}
				/>
				<span
					style={{
						color: disabled
							? 'var(--content-disabled)'
							: loction
							? 'var(--purple-main)'
							: undefined,
					}}
				>
					{text}
				</span>
				{disabled && <span className={styles['soon-text']}>Скоро</span>}
			</a>
		</li>
	);
};

export default NavItem;
