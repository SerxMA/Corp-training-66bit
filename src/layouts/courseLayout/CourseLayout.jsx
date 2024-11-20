import { useEffect, useState } from 'react';

import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';
import { api } from '../../api/index.js';

const CourseLayout = () => {

    const [modules, setModules] = useState([]);
    const [isDataChanged, setIsDataChanged] = useState(false);

    const fetchModules = async () => {
		try {
			const response = await api.modules.getAllCourseModules({params: { courseId: window.location.pathname.match(/\/course\/(\d+)/)[1] }});
			setModules(response.data);
		} catch (error) {
			console.error('Ошибка при загрузке курсов:', error);
		}
	};

    useEffect(() => {
		fetchModules();
	}, []);

    useEffect(() => {
		if (isDataChanged) {
			fetchModules();
			setIsDataChanged(false);
		}
	}, [isDataChanged]);

    return (
        <div>
            <CourseStructure modules={modules} setIsDataChanged={setIsDataChanged}/>
        </div>
    );
};

export default CourseLayout;