import { useState } from 'react';

import Arrow from '../Arrow';
import Cross from './Cross';
import styles from './NewCourse.module.css';

const NewCourse = () => {

    const [description, setDescription] = useState('');
    const maxChars = 360;

    const handleDescriptionChange = (event) => {
        const input = event.target.value;
        if (input.length <= maxChars) {
            setDescription(input);
        }
    };


    return (
        <div className={styles['popup']}>
            <div className={styles['top-block']}>
                <h2 className={styles['title']} >Новый курс</h2>
                <button className={styles['cross']}> <Cross /> </button>
            </div>
            <div className={styles['describe-block']}>
                <div className={styles['input-box']}>
                    <input type="text" name="title" placeholder=" " />
                    <span>Название</span>
                </div>
                <div className={styles['description-box']}>
                <textarea
                        placeholder=" "
                        className={styles['description-area']}
                        value={description}
                        onChange={handleDescriptionChange}
                        maxLength={maxChars}
                    ></textarea>
                    <span>Описание</span>
                    <div className={styles['char-counter']}>{description.length} / {maxChars}</div>
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
