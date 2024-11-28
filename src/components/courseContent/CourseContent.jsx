import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../api';
import styles from './CourseContent.module.css';
import AddNewContent from '../addNewContent/AddNewContent.jsx';
import TaskWrapper from '../taskWrapper/TaskWrapper.jsx';

const CourseContent = () => {
	const [elements, setElements] = useState([]);
	const { topicId } = useParams();

	useEffect(() => {
		api.content
			.getContent({
				params: {
					topicId: topicId,
				},
			})
			.then((res) => {
				setElements(res.data);
				console.log(res);
			});
	}, []);

	return (
		<div className={styles['content-wrapper']}>
			<ul className={styles['content-list']}>
				<AddNewContent />
				{elements.length ? (
					elements.map((element, index) => (
						<div key={index} className={styles.thisOneElement}>
							<TaskWrapper element={element} />
							<AddNewContent />
						</div>
					))
				) : (
					<li>
						<div>Нет элементов</div>
					</li>
				)}
			</ul>
		</div>
	);
};

export default CourseContent;
