import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employeeDetailsReducer from './feature/employeeDetailsSlice.js'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// export const store = configureStore({
//     reducer: {
//         user: userReducer,
//     },
// })


const rootReducer = combineReducers({
    employeeDetails: employeeDetailsReducer
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