import { useEffect, useState } from 'react';

import { api } from '../../api';
import styles from './CourseContent.module.css'
import AddNewContent from '../addNewContent/AddNewContent.jsx';

const CourseContent = () => {

    const [elements, setElements] = useState([]);

    useEffect(() => {
        api.content.getContent({ params: {topicId: window.location.pathname.match(/\/course\/\d+\/(\d+)/)[1]} })
    .then((res) => {
        setElements(res.data)
    })
    }, [])

    return (
        <div className={styles['content-wrapper']}>
            <ul className={styles['content-list']}>
                <AddNewContent />
                { elements.length > 0
                ?   (
                        elements.map((element, index) => {
                            <AddNewContent key={index}/>
                        })
                )
                :   (<li><div>Нет элементов</div></li>)
                }   
            </ul>
        </div>
    );
};

export default CourseContent;