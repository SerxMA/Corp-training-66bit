import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getContents } from '../../store/actions/contents.js';
import AddNewContent from '../addNewContent/AddNewContent.jsx';
import TaskWrapper from '../taskWrapper/TaskWrapper.jsx';
import styles from './CourseContent.module.css';

const CourseContent = () => {
	const dispatch = useDispatch();
	const { contents } = useSelector((state) => state.contents);
	const { topicId } = useParams();

	console.log(contents);

	useEffect(() => {
		dispatch(getContents(topicId));
	}, [topicId]);

	return (
		<div className={styles['content-wrapper']}>
			<ul className={styles['content-list']}>
				<AddNewContent position={0} />
				{contents.length ? (
					contents.map((content, index) => (
						<div key={index} className={styles.thisOneElement}>
							<TaskWrapper element={content} />
							<AddNewContent position={index + 1} />
						</div>
					))
				) : (
					<li>
						<h3>Добавьте задания</h3>
					</li>
				)}
			</ul>
		</div>
	);
};

export default CourseContent;
