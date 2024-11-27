import { useState } from 'react';

import DropDownAddContent from '../../modals/dropDownAddContent/DropDownAddContent.jsx';

const AddNewContent = () => {

    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button style={{display: 'flex', alignItems: 'center', color: 'var(--content-secondary)'}} onClick={clickHandler}>
                [
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99935 4.16699V15.8337M4.16602 10.0003H15.8327" stroke="var(--content-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ]
            </button>
            { isOpen && (<DropDownAddContent />)
            }
        </>
    );
};

export default AddNewContent;