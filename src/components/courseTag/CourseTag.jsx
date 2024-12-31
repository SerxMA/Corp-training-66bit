import styles from './CourseTag.module.css';

const CourseTag = ({ tag, className }) => {
	return (
		<li
			className={`${styles.tag} ${className ? className : ''}`}
			style={{ backgroundColor: tag.color }}
		>
			<span style={{ color: tag.textColor }} className={styles['text']}>
				{tag.name}
			</span>
		</li>
	);
};

export default CourseTag;
