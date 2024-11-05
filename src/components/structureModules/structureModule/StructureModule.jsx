import styles from './StructureModule.module.css'
import StructureLesson from '../structureLesson/StructureLesson.jsx';

const StructureModule = ({expandedState}) => {
    return (
        <ul className={`${styles['dropdown']} ${expandedState && styles['is-expanded']}`}>
            <li><StructureLesson /></li>
            <li><StructureLesson /></li>
            <li><StructureLesson /></li>
        </ul>
    );
};

export default StructureModule;