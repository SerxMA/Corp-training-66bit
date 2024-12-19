import styles from './Checkbox.module.css';

const Checkbox = ({ state, onClick }) => {
	return (
		<div
			className={`${styles.state} ${state ? styles.state_on : ''}`}
			onClick={onClick}
		></div>
	);
};

export default Checkbox;
