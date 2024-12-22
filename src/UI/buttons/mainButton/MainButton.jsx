import ArrowRight from '../../svg/arrowRight/ArrowRight.jsx';
import styles from './MainButton.module.css';

const MainButton = ({
	className,
	onClick = () => {},
	disabled = false,
	children = 'button',
	type = 'primary',
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

export default MainButton;
