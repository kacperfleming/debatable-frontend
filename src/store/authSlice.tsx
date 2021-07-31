import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
    userId?: string;
    token?: string;
}

const initialState:AuthState = {
    userId: undefined,
    token: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        logout(state) {
            state.userId = undefined;
            state.token = undefined;
        } 
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;