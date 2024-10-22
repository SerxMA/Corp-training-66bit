import CourseTag from '../../../courseTag/CourseTag';
import styles from './CourseCard.module.css'

const CourseCard = ( img, tag, title, description) => {

    return (
        <div className={styles['card']}>
            <img src={img} alt="" className={styles['course-img']}/>
            <CourseTag type={'design'}/>
            {/* design это заглушка, потом нужно заменить на tag */}
            <h4 className={styles['title']} >{title}</h4>
            <span className={styles['description']}>
                {description}
            </span>
        </div>
    );
};

export default CourseCard;