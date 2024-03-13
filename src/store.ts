// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'

const rootReducer = combineReducers({
    auth: authReducer,
})

const store = configureStore({
    reducer: rootReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
export default store;
