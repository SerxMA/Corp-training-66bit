import { getAllCourses } from './getAllCourses';
import { getUserRole } from './getUserRole';
import { postNewCourse } from './postNewCourse';

export const api = {
	user: { getUserRole },
	courses: { postNewCourse, getAllCourses },
};
