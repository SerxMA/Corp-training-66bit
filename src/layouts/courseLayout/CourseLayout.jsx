import { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getModules } from '../../store/actions/modules.js';
import { getCourse } from '../../store/actions/course.js';
import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';
import TaskWrapper from '../../components/taskWrapper/TaskWrapper.jsx';
import styles from './CourseLayout.module.css';
import TaskSingleAnswer from '../../components/taskSingleAnswer/TaskSingleAnswer.jsx';
import TaskMultiAnswer from '../../components/taskMultiAnswer/TaskMultiAnswer.jsx';
import TaskDetailedAnswer from '../../components/taskDetailedAnswer/TaskDetailedAnswer.jsx';
import TaskFreeformAnswer from '../../components/taskFreeformAnswer/TaskFreeformAnswer.jsx';

const CourseLayout = () => {
	const dispatch = useDispatch();
	const thisAdmin = false;

	useEffect(() => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		dispatch(getModules(courseId));
		dispatch(getCourse(courseId));
	}, []);

	// Поменять структуру(немного)
	return (
		<>
			<CourseStructure />
			<div className={styles.content}>
				{thisAdmin && <h4>Тут будет панелька</h4>}
				{/* <Outlet /> */}
				<div className={styles.thisPeredelatiOOO}>
					<TaskWrapper type={'yourTitle'} title={'Кастомный загар'}>
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
					<TaskWrapper type={'text'}>
						Вот таким образом будет выглядет текстовая лекция по
						нашему мнению. Этот блок может растягиваться настолько,
						что вместит в себя целый текст-рыбу Lorem ipsum dolor
						sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut
						enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis
						aute irure dolor in reprehenderit in voluptate velit
						esse cillum dolore eu fugiat nulla pariatur. Excepteur
						sint occaecat cupidatat non proident, sunt in culpa qui
						officia deserunt mollit anim id est laborum.
					</TaskWrapper>
					<TaskWrapper type={'singleAnswer'} points={1} attempts={2}>
						<TaskSingleAnswer />
					</TaskWrapper>
					<TaskWrapper type={'multiAnswer'}>
						<TaskMultiAnswer></TaskMultiAnswer>
					</TaskWrapper>
					<TaskWrapper type={'detailedAnswer'}>
						<TaskDetailedAnswer></TaskDetailedAnswer>
					</TaskWrapper>
					<TaskWrapper type={'freeformAnswer'}>
						<TaskFreeformAnswer></TaskFreeformAnswer>
					</TaskWrapper>
				</div>
			</div>
		</>
	);
};

export default CourseLayout;
