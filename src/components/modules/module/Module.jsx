import { useState } from 'react';

import Plus from '../Plus.jsx';
import DrDown from '../DrDown.jsx';
import ProgressCircle from '../ProgressCicrcle.jsx';
import Edit from '../lesson/icons/Edit.jsx';
import Trash from '../lesson/icons/Trash.jsx';
import Lessons from '../lessons/Lessons.jsx';
import DeleteEntity from '../../../modals/deleteEntity/DeleteEntity.jsx';
import ChangeName from '../../../modals/changeName/ChangeName.jsx';
import styles from './Module.module.css';

const Module = ({ type, content, setIsDataChanged }) => {
	const [expanded, setExapnded] = useState(false);
	const [newLesson, setNewLesson] = useState(false);
	const [edit, setEdit] = useState(false);
	const [trash, setTrash] = useState(false);

	const handleClick = () => {
		setExapnded(!expanded);
	};

	const openPopup = (e, setOpen) => {
		e.stopPropagation();
		setOpen(true);
	};

	return (
		<div
			className={`${styles['module-container']} ${
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
					<span className={styles['course-title']}>
						{content.title}
					</span>
					<div className={styles['manage-btn']}>
						{type === 'edit' && (
							<>
								<button onClick={(e) => openPopup(e, setEdit)}>
									<Edit />
								</button>
								<button onClick={(e) => openPopup(e, setTrash)}>
									<Trash />
								</button>
								<button
									onClick={(e) => openPopup(e, setNewLesson)}
								>
									<Plus />
								</button>
							</>
						)}
						<button className={styles['drop-down-arrow']}>
							<DrDown />
						</button>
					</div>
				</div>
			</div>
			<Lessons
				expandedState={expanded}
				type={type}
				topics={content.topics}
				setIsDataChanged={setIsDataChanged}
			/>
			{edit && (
				<ChangeName
					setOpen={setEdit}
					type={'module'}
					content={content.title}
					position={content.position}
					id={content.id}
					setIsDataChanged={setIsDataChanged}
				/>
			)}
			{trash && (
				<DeleteEntity
					setOpen={setTrash}
					type={'module'}
					content={content.title}
					id={content.id}
					setIsDataChanged={setIsDataChanged}
				/>
			)}
			{newLesson && <ChangeName setOpen={setNewLesson} type={'lesson'} setIsDataChanged={setIsDataChanged} id={content.id}/>}
		</div>
	);
};

export default Module;
