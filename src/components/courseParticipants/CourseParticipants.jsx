import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMembers } from '../../store/actions/members';
import MemberRow from '../memberRow/MemberRow.jsx';
import styles from './CourseParticipants.module.css';

const CourseParticipants = () => {
	const dispatch = useDispatch();
	const { course } = useSelector((state) => state.course);
	const { members } = useSelector((state) => state.members);
	const [currMembers, setCurrMembers] = useState([]);
	const [memberManagment, setMemberManagment] = useState(0);

	console.log(currMembers);

	const toggleStateMembers = (username) => {
		setCurrMembers((cv) =>
			cv.map((obj) =>
				obj.user.username === username
					? { ...obj, state: !obj.state }
					: obj
			)
		);
	};

	useEffect(() => {
		members.length &&
			setCurrMembers(
				members.map((member) => ({ ...member, state: false }))
			);
	}, [members]);

	useEffect(() => {
		course.id && dispatch(getMembers({ params: { courseId: course.id } }));
	}, [course]);

	return (
		<>
			<div
				className={`${styles['members-menu']} ${
					currMembers.filter((member) => member.state).length
						? styles['members-menu_show']
						: ''
				}`}
			>
				<div className={styles.count}>
					Выбрано:{' '}
					{currMembers.filter((member) => member.state).length}
				</div>
				<div className={styles.managments}>
					<button>Переместить</button>
					<button>Удалить</button>
					<button
						onClick={() =>
							setCurrMembers((cv) =>
								cv.map((member) => ({
									...member,
									state: false,
								}))
							)
						}
					>
						Отменить выбор
					</button>
				</div>
			</div>
			<div className={styles['member-wrapper']}>
				<div className={styles['member-table']}>
					<div className={styles['column-name']}>
						<span>Пользователь</span>
						<span>Статус</span>
						<span>Группа</span>
						<span>Прогресс</span>
					</div>
					{currMembers.length
						? currMembers.map((member) => (
								<MemberRow
									key={member.user.username}
									member={member}
									memberManagmentState={memberManagment}
									setMemberManagment={setMemberManagment}
									onClick={() =>
										toggleStateMembers(member.user.username)
									}
								/>
						  ))
						: 'Участников нет'}
				</div>
			</div>
		</>
	);
};

export default CourseParticipants;
