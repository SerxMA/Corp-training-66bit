import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth.js';
import { getContents, getContentsUser } from '../../store/actions/contents.js';
import { getCourse } from '../../store/actions/course.js';
import AddNewContent from '../addNewContent/AddNewContent.jsx';
import TaskWrapper from '../taskWrapper/TaskWrapper.jsx';
import styles from './CourseContent.module.css';

const CourseContent = () => {
	const dispatch = useDispatch();
	const { contents } = useSelector((state) => state.contents);
	const { modules } = useSelector((state) => state.modules);
	const { role } = useAuth();
	const { topicId } = useParams();

	console.log(contents);

	useEffect(() => {
		if (role === 'ADMIN') dispatch(getContents(topicId));
		else {
			let currentTopic = undefined;

			modules.map((module) => {
				if (module.topics.find((topic) => topic.id === +topicId))
					currentTopic = module.topics.find(
						(topic) => topic.id === +topicId
					);
			});
			if (currentTopic && currentTopic.userTopic)
				dispatch(
					getContentsUser({
						params: {
							topicId,
							userTopicId: currentTopic.userTopic.id,
						},
					})
				);
		}
	}, [topicId, modules]);

	useEffect(() => {
		if (role === 'ADMIN') {
			const courseId =
				window.location.pathname.match(/\/course\/(\d+)/)[1];
			dispatch(getCourse(courseId));
		}
	}, [contents]);

	return (
		<div className={styles['content-wrapper']}>
			<ul className={styles['content-list']}>
				{role === 'ADMIN' && <AddNewContent position={0} />}
				{contents.length ? (
					contents.map((content, index) => (
						<div key={index} className={styles.thisOneElement}>
							<TaskWrapper element={content} />
							{role === 'ADMIN' && (
								<AddNewContent position={index + 1} />
							)}
						</div>
					))
				) : role === 'ADMIN' ? (
					<li>
						<h3>Добавьте задания</h3>
					</li>
				) : (
					<li>
						<h3>Заданий нет</h3>
					</li>
				)}
			</ul>
		</div>
	);
};

export default CourseContent;
