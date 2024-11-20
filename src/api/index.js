import { getAllCourseModules } from './getAllCourseModules';
import { getAllCourses } from './getAllCourses';
import { getUserRole } from './getUserRole';
import { postNewCourse } from './postNewCourse';
import { editModule } from './editModule';
import { editLesson} from './editLesson';

export const api = {
	user: { getUserRole },
	courses: { postNewCourse, getAllCourses},
	modules: { getAllCourseModules, editModule },
	lessons: { editLesson }
};
