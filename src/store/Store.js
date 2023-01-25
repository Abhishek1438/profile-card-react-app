import { configureStore } from '@reduxjs/toolkit';
import userDataSlice from './userDataSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userDataSlice);

export const store = configureStore({
  reducer: {
    userData: persistedReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
