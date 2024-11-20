import styles from './Lessons.module.css';
import Lesson from '../lesson/Lesson.jsx';

const Lessons = ({ expandedState, type, topics, setIsDataChanged }) => {
	return (
		<ul
			className={`${styles['dropdown']} ${
				expandedState && styles['is-expanded']
			}`}
		>
			{topics.map((topic, index) => (
				<li key={index}>
					<Lesson topic={topic} type={type} setIsDataChanged={setIsDataChanged}/>
				</li>
			))}
		</ul>
	);
};

export default Lessons;
