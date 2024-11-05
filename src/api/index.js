import { getUserRole } from './getUserRole';
import { postNewCourse } from './postNewCourse';

export const api = {
	user: { getUserRole },
	course: { postNewCourse },
};
