import styles from './Lessons.module.css';
import Lesson from '../lesson/Lesson.jsx';

const Lessons = ({ expandedState, type, topics }) => {
	return (
		<ul
			className={`${styles['dropdown']} ${
				expandedState && styles['is-expanded']
			}`}
		>
			{topics.length ? (
				topics.map((topic, index) => (
					<Lesson key={index} topic={topic} type={type} />
				))
			) : (
				<h4 className={styles['topics-placeholder']}>Тем нет</h4>
			)}
		</ul>
	);
};

export default Lessons;
