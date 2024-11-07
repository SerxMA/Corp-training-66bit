import styles from './StructureModule.module.css';
import StructureLesson from '../structureLesson/StructureLesson.jsx';

const StructureModule = ({ expandedState, type }) => {
	return (
		<ul
			className={`${styles['dropdown']} ${
				expandedState && styles['is-expanded']
			}`}
		>
			<li>
				<StructureLesson type={type} />
			</li>
			<li>
				<StructureLesson type={type} />
			</li>
			<li>
				<StructureLesson type={type} />
			</li>
		</ul>
	);
};

export default StructureModule;
