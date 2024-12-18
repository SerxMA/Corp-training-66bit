import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGroups } from '../../store/actions/groups';
import GroupRow from '../groupRow/GroupRow.jsx';
import styles from './CourseGroup.module.css';

const CourseGroup = () => {
	const dispatch = useDispatch();
	const { course } = useSelector((state) => state.course);
	const { groups } = useSelector((state) => state.groups);
	const [clickGroup, setClickGroup] = useState(0);
	console.log(course);
	console.log(groups);

	useEffect(() => {
		course.id && dispatch(getGroups({ params: { courseId: course.id } }));
	}, [course]);

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
		</div>
	);
};

export default CourseGroup;
