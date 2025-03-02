import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employeeDetailsReducer from './feature/employeeDetailsSlice.js'
import createSliceReducer from './feature/createSlice.js'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    employeeDetails: employeeDetailsReducer,
    createGeneratorSlice: createSliceReducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);