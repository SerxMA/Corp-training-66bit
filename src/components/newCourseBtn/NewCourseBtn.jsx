import { useState } from 'react';

import Icon from './Icon.jsx';
import styles from './NewCourseBtn.module.css';
import CourseCreator from '../../modals/CourseCreator.jsx';

const NewCourseBtn = () => {
	const [isCourseCreatorOpen, setIsCourseCreatorOpen] = useState(false);

	const handleButtonClick = () => {
		setIsCourseCreatorOpen(true);
	};

	return (
		<>
			<button
				className={styles['new-course-btn']}
				onClick={handleButtonClick}
			>
				<Icon />
				Новый курс
			</button>
			{isCourseCreatorOpen && <CourseCreator />}
		</>
	);
};

export default NewCourseBtn;
