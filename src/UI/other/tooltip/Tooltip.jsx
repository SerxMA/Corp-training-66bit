import styles from './Tooltip.module.css';

const Tooltip = ({ position = 'bottom' }) => {
	return (
		<div className={`${styles.tooltip} ${styles[position]}`}>
			В разработке...
		</div>
	);
};

export default Tooltip;
