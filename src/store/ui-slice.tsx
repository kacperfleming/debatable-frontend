import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notification: {
        message: null,
        type: null,
        timer: 5000
    },
    isLoading: false
}

const UISlice = createSlice({
    name: 'UISlice',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setNotification(state, action) {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                timer: action.payload?.timer
            }
        }
    }
});

export const UIActions = UISlice.actions;

export default UISlice.reducer;