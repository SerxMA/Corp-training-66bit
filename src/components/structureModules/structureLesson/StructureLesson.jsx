import ProgressCircle from '../ProgressCicrcle.jsx';
import styles from './StructureLesson.module.css'

const StructureLesson = () => {
    return (
        <div className={styles['lesson']}>
            <ProgressCircle isGreen={false}/>
            <span>Lesson 1</span>
        </div>
    );
};

export default StructureLesson;