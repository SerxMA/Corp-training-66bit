import styles from './CourseTag.module.css';

const CourseTag = ({ tag }) => {
	return (
		<div
			className={styles.tag}
			style={{ backgroundColor: tag.color, stroke: tag.textColor }}
		>
			<span style={{ color: tag.name }} className={styles['text']}>{text}</span>
		</div>
	);
};

export default CourseTag;
