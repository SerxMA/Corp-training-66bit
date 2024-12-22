import styles from './RadioButton.module.css';

const RadioButton = ({ state, onClick, disabled }) => {
	return (
		<div
			className={`${styles.state} ${state ? styles.state_on : ''}`}
			onClick={onClick}
			disabled={disabled}
		>
			<span></span>
		</div>
	);
};

export default RadioButton;
