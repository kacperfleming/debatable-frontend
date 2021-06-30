import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    error: null,
    isLoading: false
}

const UISlice = createSlice({
    name: 'UISlice',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload,
            state.isLoading = false
        }
    }
});

export const UIActions = UISlice.actions;

export default UISlice.reducer;