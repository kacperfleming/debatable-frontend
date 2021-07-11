import { createSlice } from "@reduxjs/toolkit";

const initialState:{debates: any, pagination:number} = {
    debates: [],
    pagination: 0
}

const debateSlice = createSlice({
    name: 'debates',
    initialState,
    reducers: {
        fetchDebates(state, action) {
            state.debates = state.debates.concat(action.payload);
        },
        addDebate(state, action) {
            state.debates = action.payload.concat(state.debates);
        },
        incrementPagination(state, action) {
            state.pagination += action.payload;
        },
        clearDebates(state) {
            state.debates = [];
        },
        deleteDebate(state, action) {
            state.debates = state.debates.filter((d:any)=> d.id !== action.payload);
        },
        editEdbate(state, action) {
            state.debates[state.debates.findIndex((d:any) => d.id === action.payload.id)] = action.payload;
        }
    }
});

export const debateActions = debateSlice.actions;

export default debateSlice.reducer;