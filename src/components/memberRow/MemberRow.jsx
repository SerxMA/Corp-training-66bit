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

const MemberRow = ({
	member,
	memberManagmentState,
	setMemberManagment,
	onClick,
}) => {
	const { course } = useSelector((state) => state.course);
	const [trash, setTrash] = useState(false);
	const [relocate, setRelocate] = useState(false);

	const tag = {
		name: member.isCompleted ? 'Завершен' : 'Не завершен',
		textColor: member.isCompleted
			? 'var(--green-main)'
			: 'var(--orange-main)',
		color: member.isCompleted
			? 'var(--green-background)'
			: 'var(--orange-background)',
	};

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
			{/* <span>Это стата</span> */}
			<span>
				<CourseTag tag={tag} className={styles.tag} />
			</span>
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
							username: member.user.username,
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
							username: member.user.username,
						},
					]}
					courseId={course.id}
				/>
			)}
		</div>
	);
};

export default MemberRow;
