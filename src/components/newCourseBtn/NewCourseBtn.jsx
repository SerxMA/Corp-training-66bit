import { useState } from 'react';

import Icon from './Icon.jsx';
import styles from './NewCourseBtn.module.css';
import WrapperCourseCreator from '../../modals/wrapperCourseCreator/WrapperCourseCreator.jsx';

const NewCourseBtn = () => {
	const [isCourseCreatorOpen, setIsCourseCreatorOpen] = useState(false);

	const handleButtonClick = (e) => {
		setIsCourseCreatorOpen(true);
		e.stopPropagation();
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
			{isCourseCreatorOpen && (
				<WrapperCourseCreator setOpen={setIsCourseCreatorOpen} />
			)}
		</>
	);
};

export default NewCourseBtn;
