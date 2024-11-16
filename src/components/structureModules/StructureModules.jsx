import { useState } from 'react';

import Edit from './icons/Edit.jsx';
import Trash from './icons/Trash.jsx';
import Plus from './icons/Plus.jsx';
import DrDown from './icons/DrDown.jsx';
import ProgressCircle from './ProgressCicrcle.jsx';
import StructureModule from './structureModule/StructureModule.jsx';
import ChangeName from '../../modals/changeName/ChangeName.jsx';
import DeleteEntity from '../../modals/deleteEntity/DeleteEntity.jsx';
import styles from './StructureModules.module.css';

const StructureModules = ({ type }) => {
	const [expanded, setExapnded] = useState(false);
	const [editModule, setEditModule] = useState(false);
	const [deleteModule, setDeleteModule] = useState(false);
	const [newLesson, setNewLesson] = useState(false);

	const handleClick = () => {
		setExapnded(!expanded);
	};

	const openPopup = (e, setOpen) => {
		e.stopPropagation();
		setOpen(true);
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
							<>
								<button
									onClick={(e) => openPopup(e, setEditModule)}
								>
									<Edit />
								</button>
								<button
									onClick={(e) =>
										openPopup(e, setDeleteModule)
									}
								>
									<Trash />
								</button>
								<button
									onClick={(e) => openPopup(e, setNewLesson)}
								>
									<Plus />
								</button>
							</>
						)}
						<button>
							<DrDown />
						</button>
					</div>
				</div>
			</div>
			<StructureModule expandedState={expanded} type={type} />
			{editModule && (
				<ChangeName
					setOpen={setEditModule}
					type={'module'}
					content={'Title'}
				/>
			)}
			{deleteModule && (
				<DeleteEntity
					setOpen={setDeleteModule}
					type={'module'}
					content={'Title'}
				/>
			)}
			{newLesson && <ChangeName setOpen={setNewLesson} type={'lesson'} />}
		</div>
	);
};

export default StructureModules;
