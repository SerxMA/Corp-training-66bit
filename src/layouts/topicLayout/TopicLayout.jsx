import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth.js';
import AdminCourseTabs from '../../components/adminCourseTabs/AdminCourseTabs.jsx';
import {
	postCurrentModule,
	postCurrentTopic,
} from '../../store/actions/modules.js';

const TopicLayout = () => {
	const dispatch = useDispatch();
	const { modules } = useSelector((state) => state.modules);
	const { userCourse } = useSelector((state) => state.userCourse);
	const { myGroup } = useSelector((state) => state.myGroup);
	const { topicId } = useParams();
	const { id } = useParams();
	const { role } = useAuth();

	useEffect(() => {
		if (modules.length && role === 'USER') {
			const currentModule = modules.find((module) =>
				module.topics.some((topic) => topic.id === +topicId)
			);
			const currentTopic = currentModule?.topics.find(
				(topic) => topic.id === +topicId
			);
			if (currentModule && !currentModule.userModule) {
				dispatch(
					postCurrentModule(
						{
							params: {
								courseId: userCourse.id,
								moduleId: currentModule.id,
							},
						},
						{
							params: {
								courseId: id,
								userCourseId: userCourse.id,
								groupId: myGroup.id,
							},
						}
					)
				);
			}
			if (
				currentModule &&
				currentTopic &&
				!currentTopic.userTopic &&
				currentModule.userModule
			) {
				dispatch(
					postCurrentTopic(
						{
							params: {
								userModuleId: currentModule.userModule.id,
								topicId: topicId,
							},
						},
						{
							params: {
								courseId: id,
								userCourseId: userCourse.id,
								groupId: myGroup.id,
							},
						}
					)
				);
			}
		}
	}, [topicId, modules]);

	return (
		<>
			{role === 'ADMIN' && <AdminCourseTabs />}
			<Outlet />
		</>
	);
};

export default TopicLayout;
