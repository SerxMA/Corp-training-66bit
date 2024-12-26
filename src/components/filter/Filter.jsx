import FilterIcon from './filterIcon/FilterIcon.jsx';
import styles from './Filter.module.css';
import Tooltip from '../../UI/other/tooltip/Tooltip.jsx';

const Filter = () => {
	return (
		<button className={styles['filter-btn']}>
			<FilterIcon />
			<Tooltip />
		</button>
	);
};

export default Filter;
