import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { getModulesUser } from '../../store/actions/modules.js';
import { getCourseUser } from '../../store/actions/course.js';
import { resetCourse } from '../../store/actionCreators/course.js';
// import { resetMembers } from '../../store/actionCreators/members.js';
import { resetModules } from '../../store/actionCreators/modules.js';
import { resetContents } from '../../store/actionCreators/contents.js';
import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';
import styles from './UserCourseLayout.module.css';
import { useAuth } from '../../customHooks/useAuth.js';
import { resetMyGroup } from '../../store/actionCreators/myGroup.js';
import { getUserCourse } from '../../store/actions/userCourse.js';

const UserCourseLayout = () => {
	const { userCourse } = useSelector((state) => state.userCourse);
	const { modules } = useSelector((state) => state.modules);
	const { myGroup } = useSelector((state) => state.myGroup);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { username } = useAuth();

	useEffect(() => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		dispatch(
			getUserCourse({
				params: { username, courseId },
			})
		);

		return () => {
			dispatch(resetMyGroup());
			// dispatch(resetMembers());
			dispatch(resetContents());
			dispatch(resetModules());
			dispatch(resetCourse());
		};
	}, []);

	useEffect(() => {
		if (userCourse.id) {
			dispatch(getCourseUser({ params: { username } }, userCourse.id));
		}
	}, [userCourse]);

	useEffect(() => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		const topicId =
			window.location.pathname.match(/\/course\/\d+\/(\d+)/)?.[1];

		if (!topicId && modules.length) {
			const topicModule = modules.find((module) => module.topics.length);
			topicModule &&
				navigate(`/course/${courseId}/${topicModule.topics[0].id}`);
		}
	}, [modules]);

	useEffect(() => {
		if (myGroup.id) {
			const courseId =
				window.location.pathname.match(/\/course\/(\d+)/)[1];
			dispatch(
				getModulesUser({
					params: {
						courseId: courseId,
						userCourseId: userCourse.id,
						groupId: myGroup.id,
					},
				})
			);
		}
	}, [myGroup]);

	return (
		<>
			<CourseStructure currentScore={userCourse.currentScore} />
			<div className={styles['content-wrapper']}>
				<Outlet />
			</div>
		</>
	);
};

export default UserCourseLayout;
