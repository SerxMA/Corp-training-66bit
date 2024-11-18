import styles from './Lessons.module.css';
import Lesson from '../lesson/Lesson.jsx';

const Lessons = ({ expandedState, type, topics }) => {
	return (
		<ul
			className={`${styles['dropdown']} ${
				expandedState && styles['is-expanded']
			}`}
		>
			{topics.map((topic, index) => (
				<li key={index}>
					<Lesson topic={topic} type={type}/>
				</li>
			))}
		</ul>
	);
};

export default Lessons;
