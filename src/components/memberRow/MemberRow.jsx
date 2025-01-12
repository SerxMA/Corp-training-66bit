import { useState } from 'react';
import { useSelector } from 'react-redux';

import ProfileInfoCard from '../profileInfoCard/ProfileInfoCard.jsx';
import styles from './MemberRow.module.css';
import MemberManagment from '../../modals/memberManagment/MemberManagment.jsx';
import DeleteEntity from '../../modals/deleteEntity/DeleteEntity.jsx';
import RelocateMember from '../../modals/relocateMember/RrelocateMember.jsx';
import Checkbox from '../../UI/inputs/checkbox/Checkbox.jsx';
import Dots from '../../UI/svg/dots/Dots.jsx';
import ProgressBar from '../../UI/other/progressBar/ProgressBar.jsx';
import CourseTag from '../courseTag/CourseTag.jsx';
import { memberStatus } from '../../helpers/constants/memberStatus.js';

const MemberRow = ({
	member,
	memberManagmentState,
	setMemberManagment,
	onClick,
}) => {
	const { course } = useSelector((state) => state.course);
	const [trash, setTrash] = useState(false);
	const [relocate, setRelocate] = useState(false);
	const tag = memberStatus[member.status];

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
			<span>
				<CourseTag tag={tag} className={styles.tag} />
			</span>
			<span>{member.group.name}</span>
			<span>
				<ProgressBar
					maxScore={
						!course.score && member.status === 'FINISHED'
							? 100
							: course.score
					}
					currentScore={
						!course.score && member.status === 'FINISHED'
							? 100
							: member.currentScore
					}
				/>
			</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setMemberManagment((cv) =>
						cv === member.user.id ? 0 : member.user.id
					);
				}}
			>
				<Dots />
				{memberManagmentState === member.user.id && (
					<MemberManagment
						isTop={false}
						setOpen={setMemberManagment}
						config={{
							trash: setTrash,
							relocate: setRelocate,
						}}
					/>
				)}
			</button>
			{trash && (
				<DeleteEntity
					setOpen={setTrash}
					type={'member'}
					content={member.user.username}
					data={[
						{
							groupId: member.group.id,
							userId: member.user.id,
						},
					]}
				/>
			)}
			{relocate && (
				<RelocateMember
					setOpen={setRelocate}
					group={member.group}
					users={[
						{
							groupId: member.group.id,
							userId: member.user.id,
						},
					]}
					courseId={course.id}
				/>
			)}
		</div>
	);
};

export default MemberRow;
