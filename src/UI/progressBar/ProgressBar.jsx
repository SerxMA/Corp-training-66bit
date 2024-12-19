import { calculatePercentage } from '../../helpers/functions/calculatePercentage';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ maxScore, currentScore }) => {
	const percentage = calculatePercentage(maxScore, currentScore);
	return (
		<div className={styles['progress-bar']}>
			<div className={styles['progress-line']}>
				<div
					className={styles.line}
					style={{ width: `${percentage}%` }}
				></div>
			</div>
			{percentage}%
		</div>
	);
};

export default ProgressBar;
