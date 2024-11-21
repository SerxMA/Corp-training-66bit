import { getAllCourseModules } from './getAllCourseModules';
import { getAllCourses } from './getAllCourses';
import { getUserRole } from './getUserRole';
import { postNewCourse } from './postNewCourse';
import { editModule } from './editModule';
import { editLesson } from './editLesson';
import { getCourse } from './getCourse';
import { deleteEntity } from './deleteEntity';
import { putCourse } from './putCourse';

export const api = {
	user: { getUserRole },
	courses: {
		postNewCourse,
		getAllCourses,
		getCourse,
		deleteEntity,
		putCourse,
	},
	modules: { getAllCourseModules, editModule },
	lessons: { editLesson },
};
