import { NavLink } from 'react-router-dom';

import styles from './CourseCardPopup.module.css';
import Cross from '../Cross.jsx';
import CourseTag from '../../components/courseTag/CourseTag.jsx';
import Arrow from '../Arrow.jsx';

const CourseCardPopup = ({title, img, tag, description, link}) => {
    return (
        <div className={styles['popup']}>
            <div className={styles['top-block']}>
                <h2 className={styles['title']} >{title}</h2>
                <button className={styles['cross']}> <Cross /> </button>
            </div>
            <div className={styles['visual-block']}>
                <img src={img} alt="course img" className={styles['course-img']}/>
                <CourseTag type={tag} /> {/*Потом здесь будет тэг*/}
            </div>
            <div className={styles['description']}>
                {description}
            </div>
            <NavLink className={styles['continue-btn']} to={link}>К материалам курса <Arrow /></NavLink>
        </div>
    );
};

export default CourseCardPopup;