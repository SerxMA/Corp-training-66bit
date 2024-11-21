import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';
import { getModules } from '../../store/actions/modules.js';
import { getCourse } from '../../store/actions/course.js';

const CourseLayout = () => {
	const dispatch = useDispatch();
	const { modules } = useSelector((state) => state.modules);

	const [isDataChanged, setIsDataChanged] = useState(false);

	console.log(modules);

	// по идее можно в один useEffect завернуть
	// перенести получение инфо о курсе СЮДА
	useEffect(() => {
		dispatch(
			getModules(window.location.pathname.match(/\/course\/(\d+)/)[1])
		);
		dispatch(
			getCourse(window.location.pathname.match(/\/course\/(\d+)/)[1])
		);
		// fetchModules();
	}, []);

	return (
		<div>
			<CourseStructure
				modules={modules}
				setIsDataChanged={setIsDataChanged}
				id={window.location.pathname.match(/\/course\/(\d+)/)[1]}
			/>
		</div>
	);
};

export default CourseLayout;
