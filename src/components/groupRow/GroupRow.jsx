import { useState } from 'react';

import DeleteEntity from '../../modals/deleteEntity/DeleteEntity.jsx';
import GroupManagment from '../../modals/groupManagment/GroupManagment.jsx';
import AddPeoplePopup from '../../modals/addPeoplePopup/AddPeoplePopup.jsx';
import Dots from '../../UI/dots/Dots.jsx';
import styles from './GroupRow.module.css';

const GroupRow = ({ group, clickGroup, setClickGroup }) => {
	const [trash, setTrash] = useState(false);
	const [trashExclude, setTrashExclude] = useState(false);
	const [participants, setParticipants] = useState(false);

	return (
		<div className={styles.group}>
			<span>{group.name}</span>
			<span>{group.countMembers}</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setClickGroup((cv) => (cv === group.id ? 0 : group.id));
				}}
			>
				<Dots />
				{clickGroup === group.id && (
					<GroupManagment
						isTop={false}
						setOpen={setClickGroup}
						config={{
							trash: setTrash,
							trashExclude: setTrashExclude,
							participants: setParticipants,
						}}
					/>
				)}
			</button>
			{trash && (
				<DeleteEntity
					setOpen={setTrash}
					type={'group'}
					content={group.name}
					id={group.id}
				/>
			)}
			{trashExclude && (
				<DeleteEntity
					setOpen={setTrashExclude}
					type={'groupExclude'}
					content={group.name}
					id={group.id}
				/>
			)}
			{participants && <AddPeoplePopup setOpen={setParticipants} />}
		</div>
	);
};

export default GroupRow;
