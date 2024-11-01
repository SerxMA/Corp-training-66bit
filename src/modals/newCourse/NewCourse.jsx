import Arrow from '../Arrow';
import Cross from './Cross';
import styles from './NewCourse.module.css';

const NewCourse = () => {
    return (
        <div className={styles['popup']}>
            <div className={styles['top-block']}>
                <h2 className={styles['title']} >Новый курс</h2>
                <button className={styles['cross']}> <Cross /> </button>
            </div>
            <div className={styles['describe-block']}>
                <div className={styles['input-box']}>
                    <input type="text" name="title" placeholder=" " required />
                    <span>Название</span>
                </div>
                <div className={styles['description-box']}>
                    <textarea placeholder=" " className={styles['description-area']} required></textarea>
                    <span>Описание</span>
                </div>
            </div>
            <button className={styles['continue-btn']}>
                Продолжить
                <Arrow />
            </button>
        </div>
    );
};

export default NewCourse;
