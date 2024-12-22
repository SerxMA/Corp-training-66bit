import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getMembers } from '../../store/actions/members';
import MemberRow from '../memberRow/MemberRow.jsx';
import styles from './CourseParticipants.module.css';
import PaginationBar from '../paginationBar/PaginationBar.jsx';
import RelocateMember from '../../modals/relocateMember/RrelocateMember.jsx';
import DeleteEntity from '../../modals/deleteEntity/DeleteEntity.jsx';

const CourseParticipants = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { topicId } = useParams();
	const [searchParams] = useSearchParams();
	const { course } = useSelector((state) => state.course);
	const { members, totalPages } = useSelector((state) => state.members);
	const [page, setPage] = useState(
		searchParams.get('page') ? +searchParams.get('page') : 1
	);
	const [currMembers, setCurrMembers] = useState([]);
	const [memberManagment, setMemberManagment] = useState(0);
	const [trash, setTrash] = useState(false);
	const [relocate, setRelocate] = useState(false);

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
		if (totalPages > 1 && page > totalPages) {
			setPage(1);
		}
	}, [totalPages]);

	useEffect(() => {
		members.length &&
			setCurrMembers(
				members.map((member) => ({ ...member, state: false }))
			);
	}, [members]);

	useEffect(() => {
		if (course.id) {
			if (page >= 1) {
				dispatch(
					getMembers({ params: { courseId: course.id } }, page - 1)
				);
				navigate(
					`/course/${course.id}/${topicId}/participants?page=${page}`
				);
			} else {
				setPage(1);
			}
		}
	}, [course, page]);

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
					<button onClick={() => setRelocate(true)}>
						Переместить
					</button>
					<button onClick={() => setTrash(true)}>Удалить</button>
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
				<PaginationBar
					maxPage={totalPages}
					currentPage={page}
					onPageChange={setPage}
				/>
			</div>
			{trash && (
				<DeleteEntity
					setOpen={setTrash}
					type={'member'}
					data={currMembers
						.filter((member) => member.state)
						.map((member) => ({
							groupId: member.group.id,
							username: member.user.username,
						}))}
				/>
			)}
			{relocate && (
				<RelocateMember
					setOpen={setRelocate}
					users={currMembers
						.filter((member) => member.state)
						.map((member) => ({
							groupId: member.group.id,
							username: member.user.username,
						}))}
					courseId={course.id}
				/>
			)}
		</>
	);
};

export default CourseParticipants;
