import {configureStore} from '@reduxjs/toolkit';

import { AuthState } from './authSlice';
import { UserState } from './userSlice';
import { UIState } from './ui-slice';

import authReducer from './authSlice';
import UIReducer from './ui-slice';
import userReducer from './userSlice';

export interface RootState {
    auth: AuthState;
    user: UserState;
    UI: UIState;
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        UI: UIReducer,
    }
});


export default store;