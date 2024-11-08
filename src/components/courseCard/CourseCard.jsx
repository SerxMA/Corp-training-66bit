import CourseTag from '../courseTag/CourseTag.jsx';
import styles from './CourseCard.module.css'

const CourseCard = ({img, tags, title, description}) => {

    return (
        <li className={styles['card']}>
            <img src={img} alt="" className={styles['course-img']}/>
            {tags.map((tag) => {
                <CourseTag tag={tag}/>
            })}
            <h4 className={styles['title']} >{title}</h4>
            <span className={styles['description']}>
                {description}
            </span>
        </li>
    );
};

export default CourseCard;