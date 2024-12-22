import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getGroups } from '../../store/actions/groups';
import GroupRow from '../groupRow/GroupRow.jsx';
import styles from './CourseGroup.module.css';
import PaginationBar from '../paginationBar/PaginationBar.jsx';

const CourseGroup = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { topicId } = useParams();
	const [searchParams] = useSearchParams();
	const { course } = useSelector((state) => state.course);
	const { groups, totalPages } = useSelector((state) => state.groups);
	const [page, setPage] = useState(
		searchParams.get('page') ? +searchParams.get('page') : 1
	);
	const [clickGroup, setClickGroup] = useState(0);

	console.log(totalPages);
	console.log(groups);

	useEffect(() => {
		if (totalPages > 1 && page > totalPages) {
			setPage(1);
		}
	}, [totalPages]);

	useEffect(() => {
		if (course.id) {
			if (page >= 1) {
				dispatch(
					getGroups({ params: { courseId: course.id } }, page - 1)
				);
				navigate(`/course/${course.id}/${topicId}/groups?page=${page}`);
			} else {
				setPage(1);
			}
		}
	}, [course, page]);

	return (
		<div className={styles['group-wrapper']}>
			<div className={styles['group-table']}>
				<div className={styles['column-name']}>
					<span>Группа</span>
					<span>Участники</span>
				</div>
				{groups.length
					? groups.map((group) => (
							<GroupRow
								key={group.id}
								group={group}
								clickGroup={clickGroup}
								setClickGroup={setClickGroup}
							/>
					  ))
					: 'Групп нет'}
			</div>
			<PaginationBar
				maxPage={totalPages}
				currentPage={page}
				onPageChange={setPage}
			/>
		</div>
	);
};

export default CourseGroup;
