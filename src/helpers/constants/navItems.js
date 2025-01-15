import Certificate from '../../UI/svg/certificate/Certificate.jsx';
import ChartPie from '../../UI/svg/chartPie/ChartPie.jsx';
import Grid from '../../UI/svg/grid/Grid.jsx';
import PersonGroup from '../../UI/svg/personGroup/PersonGroup.jsx';
import Statement from '../../UI/svg/statement/Statement.jsx';

export const navItems = {
	courses: { href: '/courses', Icon: Grid, text: 'Курсы', disabled: false },
	statement: {
		href: '/statement',
		Icon: Statement,
		text: 'Ведомость',
		disabled: true,
	},
	analytics: {
		href: '/soon',
		Icon: ChartPie,
		text: 'Аналитика',
		disabled: true,
	},
	certificates: {
		href: '/soon',
		Icon: Certificate,
		text: 'Сертификаты',
		disabled: true,
	},
	staff: {
		href: '/soon',
		Icon: PersonGroup,
		text: 'Сотрудники',
		disabled: true,
	},
};
