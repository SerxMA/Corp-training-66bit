import { getUser } from './user';
import {
	deleteCourse,
	getCourse,
	getCourses,
	postCourse,
	putCourse,
} from './courses';
import { deleteModule, getModules, postModule, putModule } from './modules';
import { deleteLesson, postLesson, putLesson } from './lessons';
import { deleteContentElement, getContent, postContentElement, putContentElement } from './content';

export const api = {
	user: { getUser },
	courses: {
		postCourse,
		getCourses,
		getCourse,
		putCourse,
		deleteCourse,
	},
	modules: { 
		postModule,
		getModules, 
		putModule, 
		deleteModule 
	},
	lessons: { 
		postLesson, 
		putLesson, 
		deleteLesson 
	},
	content: {
		getContent,
		postContentElement,
		putContentElement,
		deleteContentElement
	}
};
