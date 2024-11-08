import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

import userReducer from './reducers/userReducer';
import coursesReducer from './reducers/coursesReducer';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
	reducer: {
		user: persistedReducer,
		courses: coursesReducer,
	},
});

const persistor = persistStore(store);

export { store, persistor };
