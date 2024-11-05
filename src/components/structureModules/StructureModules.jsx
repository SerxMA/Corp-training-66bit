import { useState } from 'react'

import DrDown from './DrDown.jsx';
import ProgressCircle from './ProgressCicrcle.jsx';
import styles from './StructureModules.module.css';
import StructureModule from './structureModule/StructureModule.jsx';

const StructureModules = () => {

    const [expanded, setExapnded] = useState(false);

    const handleClick = () => {
        setExapnded(!expanded)
    }

    return (
        <div className={`${styles['module-header']} ${expanded && styles['is-expanded-module']}`}>
                <div className={`${styles['content']} ${expanded && styles['is-expanded-content']}`} onClick={handleClick}>
                    <ProgressCircle isGreen={true}/>
                    <div className={styles['content-text']}>
                        <span className={styles['course-title']}>Title</span>
                        <DrDown />
                    </div>
                </div>
                <StructureModule expandedState={expanded}/>
        </div>
    );
};

export default StructureModules;