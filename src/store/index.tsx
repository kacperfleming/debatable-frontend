import {configureStore} from '@reduxjs/toolkit';

import authReducer from './authSlice';
import UIReducer from './ui-slice';
import debatesReducer from './debateSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        UI: UIReducer,
        debates: debatesReducer
    }
});


export default store;