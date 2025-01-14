import ArrowRight from '../../svg/arrowRight/ArrowRight.jsx';
import styles from './MainButton.module.css';

const MainButton = ({
	className,
	onClick = () => {},
	onMouseEnter = () => {},
	onMouseLeave = () => {},
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
			onClick={!disabled ? onClick : undefined}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			// disabled={disabled}
		>
			{children}
			{sequel && <ArrowRight />}
		</button>
	);
};

export default MainButton;
