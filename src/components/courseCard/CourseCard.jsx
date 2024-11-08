import CourseTag from '../courseTag/CourseTag.jsx';
import styles from './CourseCard.module.css';

const CourseCard = ({ img, tags, title, description }) => {
	return (
		<li className={styles['card']}>
			<img src={img} alt="" className={styles['course-img']} />
			<ul className={styles['tags-list']}>
				{tags.map((tag, index) => (
					<CourseTag key={index} tag={tag} />
				))}
			</ul>
			<h4 className={styles['title']}>{title}</h4>
			<span className={styles['description']}>{description}</span>
		</li>
	);
};

export default CourseCard;
