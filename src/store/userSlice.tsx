import {createSlice} from '@reduxjs/toolkit';

interface state {
    username: string | null;
    email: string | null;
    likes: string[];
    dislikes: string[];
    avatar: string | null;
    reputation: number;
    observed: string[];
}

const initialState:state = {
    username: null,
    email: null,
    likes: [],
    dislikes: [],
    avatar: null,
    reputation: 0,
    observed: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state:state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.observed = action.payload.observed;
            state.reputation = action.payload.reputation;
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
        },
        clearUser(state:state) {
            state = initialState;
        },
        addFavorite(state:state, action) {
            state.observed = state.observed.concat(action.payload)
        },
        removeFavorite(state:state, action) {
            state.observed = state.observed.filter((d:string) => d !== action.payload)
        },
        manageReputation(state:state, action) {
            state.reputation = state.reputation + action.payload
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;