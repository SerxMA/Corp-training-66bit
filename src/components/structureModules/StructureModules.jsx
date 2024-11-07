import { useState } from 'react';

import Plus from './Plus.jsx';
import DrDown from './DrDown.jsx';
import ProgressCircle from './ProgressCicrcle.jsx';
import styles from './StructureModules.module.css';
import StructureModule from './structureModule/StructureModule.jsx';
import ChangeLessonName from '../../modals/changeLessonName/ChangeLessonName.jsx';

const StructureModules = ({ type }) => {
	const [expanded, setExapnded] = useState(false);
	const [newLesson, setNewLesson] = useState(false);

	const handleClick = () => {
		setExapnded(!expanded);
	};

	return (
		<div
			className={`${styles['module-header']} ${
				expanded && styles['is-expanded-module']
			}`}
		>
			<div
				className={`${styles['content']} ${
					expanded && styles['is-expanded-content']
				}`}
				onClick={handleClick}
			>
				<ProgressCircle isGreen={true} />
				<div className={styles['content-text']}>
					<span className={styles['course-title']}>Title</span>
					<div className={styles['manage-btn']}>
						{type === 'edit' && (
							<button
								onClick={(e) => {
									e.stopPropagation();
									setNewLesson(true);
								}}
							>
								<Plus />
							</button>
						)}
						<DrDown />
					</div>
				</div>
			</div>
			<StructureModule expandedState={expanded} type={type} />
			{newLesson && <ChangeLessonName setOpen={setNewLesson} />}
		</div>
	);
};

export default StructureModules;
