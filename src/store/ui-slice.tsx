import { createSlice } from "@reduxjs/toolkit";

type state = {
    notification: {
        open: boolean;
        message?: string;
        type?: 'error' | 'warning' | 'info' | 'success' 
    };
    isLoading: boolean;
}

const initialState = {
  notification: {
    open: false,
    message: null,
    type: null,
  },
  isLoading: false,
};

const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setNotification(state, action) {
      state.notification = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    closeNotifiaction(state) {
      state.notification = {
        ...state.notification,
        open: false,
      };
    },
  },
});

export const UIActions = UISlice.actions;

export default UISlice.reducer;
