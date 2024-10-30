import Cross from './Cross';
import styles from './NewCourse.module.css'

const NewCourse = () => {
    return (
        <div className={styles['popup']}>
            <div className={styles['top-block']}>
                <h2 className={styles['title']} >Новый курс</h2>
                <button> <Cross /> </button>
            </div>
            <div>
                <input type="text" placeholder="Название"/>
                <input type="text" placeholder="Описание"/>
            </div>
            <button>

            </button>
        </div>
    );
};

export default NewCourse;