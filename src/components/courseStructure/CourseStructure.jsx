import StructureModule from '../structureModules/StructureModules.jsx';
import styles from './CourseStructure.module.css'
import Edit from './Edit.jsx';

const CourseStructure = () => {
    return (
        <div className={styles['nav-panel']}>
            <div className={styles['course-title-block']}>
                <h3 className={styles['course-title']}>
                    Графический дизайн для начинающих в фигме
                </h3>
            </div>
            <div className={styles['course-structure']}>
                <div className={styles['course-structure-edit']}>
                    <h3>Модули</h3>
                    <Edit />
                </div>
                    <StructureModule />
            </div>
        </div>
    );
};

export default CourseStructure;