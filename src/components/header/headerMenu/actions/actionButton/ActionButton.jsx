import React from 'react';
import styles from './ActionButton.module.css'

const ActionButton = ({ path, Icon }) => {
    return (
        <button>
            <Icon />
        </button>
    );
};

export default ActionButton;