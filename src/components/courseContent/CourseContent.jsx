import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../api';
import styles from './CourseContent.module.css';

const CourseContent = () => {
	const { topicId } = useParams();
	const [elements, setElements] = useState([]);
	console.log(elements);

	useEffect(() => {
		api.content
			.getContent({
				params: {
					topicId: topicId,
				},
			})
			.then((res) => {
				setElements(res.data);
			});
	}, [topicId]);

	return (
		<div className={styles['content-wrapper']}>
			<ul className={styles['content-list']}></ul>
		</div>
	);
};

export default CourseContent;
