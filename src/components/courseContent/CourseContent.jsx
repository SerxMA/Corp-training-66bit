import { useEffect, useState } from 'react';

import { api } from '../../api';
import styles from './CourseContent.module.css'

const CourseContent = () => {

    const [elements, setElements] = useState([]);

    useEffect(() => {
        api.content.getContent({ params: {topicId: window.location.pathname.match(/\/course\/\d+\/(\d+)/)[1]} })
    .then((res) => {
        setElements(res.data)
        console.log(res)
    })
    }, [])

    return (
        <div className={styles['content-wrapper']}>
            <ul className={styles['content-list']}>
            </ul>
        </div>
    );
};

export default CourseContent;