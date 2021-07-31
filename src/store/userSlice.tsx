import {createSlice} from '@reduxjs/toolkit';


export interface UserState {
    username?: string;
    email?: string;
    likes: string[];
    dislikes: string[];
    avatar?: string;
    reputation: number;
    observed: string[];
}

const initialState:UserState = {
    username: undefined,
    email: undefined,
    likes: [],
    dislikes: [],
    avatar: undefined,
    reputation: 0,
    observed: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state:UserState, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.observed = action.payload.observed;
            state.reputation = action.payload.reputation;
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
        },
        clearUser(state:UserState) {
            state = initialState;
        },
        addFavorite(state:UserState, action) {
            state.observed = state.observed.concat(action.payload)
        },
        removeFavorite(state:UserState, action) {
            state.observed = state.observed.filter((d:string) => d !== action.payload)
        },
        manageReputation(state:UserState, action) {
            state.reputation = state.reputation + action.payload
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;