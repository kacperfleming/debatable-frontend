import {configureStore} from '@reduxjs/toolkit';

import authReducer from './authSlice';
import UIReducer from './ui-slice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        UI: UIReducer,
    }
});


export default store;