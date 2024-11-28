import { useEffect, useState } from 'react';

import { api } from '../../api';
import styles from './CourseContent.module.css';
import AddNewContent from '../addNewContent/AddNewContent.jsx';
import TaskWrapper from '../taskWrapper/TaskWrapper.jsx';

const CourseContent = () => {
	const [elements, setElements] = useState([]);

	useEffect(() => {
		api.content
			.getContent({
				params: {
					topicId:
						window.location.pathname.match(
							/\/course\/\d+\/(\d+)/
						)[1],
				},
			})
			.then((res) => {
				setElements(res.data);
			});
	}, []);

	return (
		<div className={styles['content-wrapper']}>
			<ul className={styles['content-list']}>
				<div className={styles.thisOneElement}>
					<TaskWrapper type={'yourTitle'} title={'Это заглушка Ы'}>
						Аннотация к уроку. Этот блок может растягиваться
						настолько, что вместит в себя целый текст-рыбу Lorem
						ipsum dolor sit amet, consectetur adipiscing elit, sed
						do eiusmod tempor incididunt ut labore et dolore magna
						aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</TaskWrapper>
					<AddNewContent />
				</div>
				{elements.length ? (
					elements.map((element, index) => (
						<AddNewContent key={index} />
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
