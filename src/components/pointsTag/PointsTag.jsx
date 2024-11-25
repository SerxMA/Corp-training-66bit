import styles from './PointsTag.module.css';

const PointsTag = ({ children }) => {
	// окончания!!!
	return (
		<div className={styles['points-tag']}>
			<p>{children} балл</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					d="M12 4L4 12M4 4L12 12"
					stroke="var(--blue-main)"
					strokeWidth="1.33333"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};

export default PointsTag;
