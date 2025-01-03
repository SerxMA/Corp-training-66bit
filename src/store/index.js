import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { thunk } from 'redux-thunk';

import userReducer from './reducers/userReducer';
import coursesReducer from './reducers/coursesReducer';
import modulesReducer from './reducers/modulesReducer';
import courseReducer from './reducers/courseReducer';
import contentsReducer from './reducers/contentsReducer';
import groupsReducer from './reducers/groupsReducer';
import membersReducer from './reducers/membersReducer';
import myGroupReducer from './reducers/myGroupReducer';
import userCourseReducer from './reducers/userCourseReducer';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
	reducer: {
		user: persistedReducer,
		courses: coursesReducer,
		course: courseReducer,
		userCourse: userCourseReducer,
		modules: modulesReducer,
		contents: contentsReducer,
		groups: groupsReducer,
		myGroup: myGroupReducer,
		members: membersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
