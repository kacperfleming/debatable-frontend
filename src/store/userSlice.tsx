import {createSlice} from '@reduxjs/toolkit';

interface state {
    username: string | null;
    reputation: number;
    role: 'guest' | 'user' | 'mod' | 'admin';
    debates: [string] | null;
    favorites: any;
    settings: {
        theme: 'light' | 'dark'
    }
}

const initialState:state = {
    username: null,
    reputation: 0,
    role: 'guest',
    debates: null,
    favorites: [],
    settings: {
        theme: 'light'
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state:any, action) {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.favorites = action.payload.favorites;
            state.reputation = action.payload.reputation;
        },
        clearUser(state:state) {
            state = initialState;
        },
        addFavorite(state:state, action) {
            state.favorites = state.favorites.concat(action.payload)
        },
        removeFavorite(state:state, action) {
            state.favorites = state.favorites.filter((d:string) => d !== action.payload)
        },
        manageReputation(state:state, action) {
            state.reputation = state.reputation + action.payload
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;