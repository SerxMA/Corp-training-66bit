import { getUser, removeUser } from './user';
import {
	deleteCourse,
	getCourse,
	getCourses,
	getAllCoursesUser,
	postCourse,
	putCourse,
	getMyCoursesUser,
	getCourseUser,
	getUserCourseData,
	postSignUpCourse,
} from './courses';
import {
	deleteModule,
	getModules,
	getModulesUser,
	postCurrentModule,
	postModule,
	putModule,
} from './modules';
import {
	deleteLesson,
	postCurrentTopic,
	postLesson,
	putLesson,
} from './lessons';
import {
	deleteContentElement,
	getContent,
	getContentsUser,
	postContentElement,
	postContentsUser,
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
		postSignUpCourse,
		getCourses,
		getCourse,
		getUserCourseData,
		getCourseUser,
		getAllCoursesUser,
		getMyCoursesUser,
		putCourse,
		deleteCourse,
	},
	modules: {
		postModule,
		postCurrentModule,
		getModules,
		getModulesUser,
		putModule,
		deleteModule,
	},
	lessons: {
		postLesson,
		postCurrentTopic,
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
		getContentsUser,
		postContentElement,
		postContentsUser,
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
