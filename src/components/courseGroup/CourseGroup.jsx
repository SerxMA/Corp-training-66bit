import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGroups } from '../../store/actions/groups';
import Dots from '../../UI/dots/Dots.jsx';
import styles from './CourseGroup.module.css';

const CourseGroup = () => {
	const dispatch = useDispatch();
	const { course } = useSelector((state) => state.course);
	const { groups } = useSelector((state) => state.groups);
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
							<div key={group.id} className={styles.group}>
								<span>{group.name}</span>
								<span>{group.countMembers}</span>
								<button>
									<Dots />
								</button>
							</div>
					  ))
					: 'Групп нет'}
			</div>
		</div>
	);
};

export default CourseGroup;
