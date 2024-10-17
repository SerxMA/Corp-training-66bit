import Loupe from './loupe/Loupe';
import styles from './SearchField.module.css'
import { useState } from 'react';

const SearchField = () => {

    const [term, setTerm] = useState();

    const handleChange = (evt) => {
        setTerm(evt.target.value);
    }

    return (
        <div className={styles['search-field-wrapper']}>
            <Loupe />
            <input type="text" placeholder="Найти курс" value={term} onChange={handleChange} className={styles['search-field']}/>
        </div>
    );
};

export default SearchField;