import rightTypeTag from '../../helpers/functions/rightTypeTag';

import styles from './CourseTag.module.css';

const colorMapping = {
	blue: { bgc: 'var(--blue-background)', text: 'var(--blue-main)' },
	red: { bgc: 'var(--red-background)', text: 'var(--red-main)' },
	green: { bgc: 'var(--green-background)', text: 'var(--green-main)' },
	orange: { bgc: 'var(--orange-background)', text: 'var(--orange-main)' },
	purple: { bgc: 'var(--purple-background)', text: 'var(--purple-main)' },
};

const CourseTag = ({ color, type }) => {
	const colors = colorMapping[color];
	const { text, image } = rightTypeTag(type, colors.text);

	return (
		<div
			className={styles.tag}
			style={{ backgroundColor: colors.bgc, stroke: colors.text }}
		>
			{image}
			<span style={{ color: colors.text }}>{text}</span>
		</div>
	);
};

export default CourseTag;
