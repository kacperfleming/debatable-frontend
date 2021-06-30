import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload
        },
        logout(state) {
            state.token = null
        } 
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;