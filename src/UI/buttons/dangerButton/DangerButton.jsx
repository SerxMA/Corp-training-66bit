import ArrowRight from '../../svg/arrowRight/ArrowRight.jsx';
import styles from './DangerButton.module.css';

const DangerButton = ({
	className,
	onClick = () => {},
	disabled = false,
	children = 'button',
	type = 'secondary',
	size = 'big',
	sequel = false,
}) => {
	return (
		<button
			className={`${styles.btn} ${styles[type]} ${styles[size]} ${
				className ? className : ''
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
			{sequel && <ArrowRight />}
		</button>
	);
};

export default DangerButton;
