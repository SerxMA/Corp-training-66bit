import StructureLesson from '../structureLesson/StructureLesson.jsx';
import styles from './StructureModule.module.css';

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
