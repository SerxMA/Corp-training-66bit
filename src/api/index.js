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
import {
	getGroups,
	postGroup,
	deleteGroup,
	putGroupUsers,
	getGroupDedlines,
	putGroupDedlines,
	putGroupExcludeUsers,
	putGroupMoveUsers,
} from './groups';
import {
	getMembersAll,
	getMembersCurrent,
	getMembersExclude,
	getMembersForNewGroup,
} from './members';

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
		getGroupDedlines,
		putGroupUsers,
		putGroupDedlines,
		putGroupMoveUsers,
		putGroupExcludeUsers,
		deleteGroup,
	},
	content: {
		getContent,
		postContentElement,
		putContentElement,
		deleteContentElement,
	},
	members: {
		getMembersCurrent,
		getMembersExclude,
		getMembersForNewGroup,
		getMembersAll,
	},
};
