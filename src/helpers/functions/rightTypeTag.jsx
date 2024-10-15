import Front from '../../components/courseTag/front/Front';
import Statistic from '../../components/courseTag/statistics/Statistics';
import DataBase from '../../components/courseTag/database/DataBase';
import Ux from '../../components/courseTag/ux/Ux';
import Brush from '../../components/courseTag/brush/Brush';

const rightTypeTag = (type, color) => {
	switch (type) {
		case 'front':
			return { text: 'Front End', image: <Front color={color} /> };
		case 'back':
			return { text: 'Back End', image: <DataBase color={color} /> };
		case 'learning':
			return {
				text: 'Машинное обучение',
				image: <DataBase color={color} />,
			};
		case 'analytics':
			return { text: 'Аналитика', image: <Statistic color={color} /> };
		case 'ux':
			return { text: 'UI/UX дизайн', image: <Ux color={color} /> };
		case 'g-design':
			return {
				text: 'Графический дизайн',
				image: <Brush color={color} />,
			};
		default:
			return <>пупупу</>;
	}
};

export default rightTypeTag;
