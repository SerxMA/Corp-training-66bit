import Icon from './icon';
import styles from './NewCourseBtn.module.css'

const NewCourseBtn = () => {
    return (
        <button className={styles['new-course-btn']}>
            <Icon />
            Новый курс
        </button>
    );
};

export default NewCourseBtn;