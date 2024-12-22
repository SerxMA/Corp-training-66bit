import { useState } from 'react';

import DeleteEntity from '../../modals/deleteEntity/DeleteEntity.jsx';
import GroupManagment from '../../modals/groupManagment/GroupManagment.jsx';
import AddPeoplePopup from '../../modals/addPeoplePopup/AddPeoplePopup.jsx';
import styles from './GroupRow.module.css';
import SetDeadlinesPopup from '../../modals/setDeadlinesPopup/SetDeadlinesPopup.jsx';
import Dots from '../../UI/svg/dots/Dots.jsx';

const GroupRow = ({ group, clickGroup, setClickGroup }) => {
	const [participants, setParticipants] = useState(false);
	const [deadlines, setDeadlines] = useState(false);
	const [trash, setTrash] = useState(false);
	const [trashExclude, setTrashExclude] = useState(false);
	console.log(group);

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
							participants: setParticipants,
							deadlines: setDeadlines,
							trash: setTrash,
							trashExclude: setTrashExclude,
						}}
					/>
				)}
			</button>
			{participants && (
				<AddPeoplePopup
					setOpen={setParticipants}
					data={{ id: group.id }}
				/>
			)}
			{deadlines && (
				<SetDeadlinesPopup
					setOpen={setDeadlines}
					data={{ id: group.id }}
				/>
			)}
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
		</div>
	);
};

export default GroupRow;
