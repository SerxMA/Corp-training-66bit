import { useEffect, useState } from 'react';

import CourseStructure from '../../components/courseStructure/CourseStructure.jsx';
import { api } from '../../api/index.js';

const CourseLayout = () => {

    const [modules, setModules] = useState([]);

    useEffect(() => {
		api.modules.getAllCourseModules({params: { courseId: window.location.pathname.match(/\/course\/(\d+)/)[1] }})
        .then((res) => {
            setModules(res.data)
        })
	}, []);

    return (
        <div>
            <CourseStructure modules={modules}/>
        </div>
    );
};

export default CourseLayout;