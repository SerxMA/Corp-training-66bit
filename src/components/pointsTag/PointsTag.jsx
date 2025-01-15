import styles from './PointsTag.module.css';

const PointsTag = ({ children }) => {
	// окончания!!!
	return (
		<div className={styles['points-tag']}>
			<p>Баллов: {children}</p>
		</div>
	);
};

export default PointsTag;
