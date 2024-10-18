import rightTypeTag from '../../helpers/functions/rightTypeTag';

import styles from './CourseTag.module.css';

const colorMapping = {
	analytics: { bgc: 'var(--blue-background)', text: 'var(--blue-main)' },
	learning: { bgc: 'var(--red-background)', text: 'var(--red-main)' },
	front: { bgc: 'var(--orange-background)', text: 'var(--orange-main)' },
	back: { bgc: 'var(--orange-background)', text: 'var(--orange-main)' },
	ux: { bgc: 'var(--purple-background)', text: 'var(--purple-main)' },
	design: { bgc: 'var(--purple-background)', text: 'var(--purple-main)' },
};

const CourseTag = ({ type }) => {
	const colors = colorMapping[type];
	const { text, image } = rightTypeTag(type, colors.text);

	return (
		<div
			className={styles.tag}
			style={{ backgroundColor: colors.bgc, stroke: colors.text }}
		>
			{image}
			<span style={{ color: colors.text }} className={styles['text']}>{text}</span>
		</div>
	);
};

export default CourseTag;
