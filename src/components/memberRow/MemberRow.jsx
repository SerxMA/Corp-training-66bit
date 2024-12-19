import { useState } from 'react';
import { useSelector } from 'react-redux';

import Checkbox from '../../UI/checkbox/Checkbox.jsx';
import Dots from '../../UI/dots/Dots.jsx';
import ProgressBar from '../../UI/progressBar/ProgressBar.jsx';
import ProfileInfoCard from '../profileInfoCard/ProfileInfoCard.jsx';
import styles from './MemberRow.module.css';
import MemberManagment from '../../modals/memberManagment/MemberManagment.jsx';
import DeleteEntity from '../../modals/deleteEntity/DeleteEntity.jsx';

const MemberRow = ({
	member,
	memberManagmentState,
	setMemberManagment,
	onClick,
}) => {
	const { course } = useSelector((state) => state.course);
	const [trash, setTrash] = useState(false);

	return (
		<div className={styles.member} onClick={onClick}>
			<Checkbox state={member.state} />
			<span>
				<ProfileInfoCard
					avatar={member.user.avatarUrl}
					username={member.user.username}
					email={member.user.email}
				/>
			</span>
			<span>Это стата</span>
			<span>{member.group.name}</span>
			<span>
				<ProgressBar
					maxScore={course.score}
					currentScore={member.currentScore}
				/>
			</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setMemberManagment((cv) =>
						cv === member.user.username ? 0 : member.user.username
					);
				}}
			>
				<Dots />
				{memberManagmentState === member.user.username && (
					<MemberManagment
						isTop={false}
						setOpen={setMemberManagment}
						config={{
							trash: setTrash,
						}}
					/>
				)}
			</button>
			{trash && (
				<DeleteEntity
					setOpen={setTrash}
					type={'member'}
					content={member.user.username}
					id={member.user.username}
				/>
			)}
		</div>
	);
};

export default MemberRow;
