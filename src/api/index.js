import { getUser, removeUser } from './user';
import {
	deleteCourse,
	getCourse,
	getCourses,
	postCourse,
	putCourse,
} from './courses';
import { deleteModule, getModules, postModule, putModule } from './modules';
import { deleteLesson, postLesson, putLesson } from './lessons';
import {
	deleteContentElement,
	getContent,
	postContentElement,
	putContentElement,
} from './content';
import { getGroups, postGroup } from './groups';
import { getMembersExclude } from './members';

export const api = {
	user: { getUser, removeUser },
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
		deleteModule,
	},
	lessons: {
		postLesson,
		putLesson,
		deleteLesson,
	},
	groups: {
		postGroup,
		getGroups,
	},
	content: {
		getContent,
		postContentElement,
		putContentElement,
		deleteContentElement,
	},
	members: { getMembersExclude },
};
