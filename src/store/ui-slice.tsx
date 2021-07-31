import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
    notification: {
        open: boolean;
        message: string;
        type?: 'error' | 'warning' | 'info' | 'success' 
    };
    isLoading: boolean;
    entryInfoAccepted: boolean;
}

const initialState:UIState = {
  notification: {
    open: false,
    message: '',
    type: undefined,
  },
  isLoading: false,
  entryInfoAccepted: false
};

const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    setLoading(state:UIState, action) {
      state.isLoading = action.payload;
    },
    setNotification(state:UIState, action) {
      state.notification = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    closeNotifiaction(state:UIState) {
      state.notification = {
        ...state.notification,
        open: false,
      };
    },
    acceptEntryInfo(state:UIState) {
      state.entryInfoAccepted = true
    }
  },
});

export const UIActions = UISlice.actions;

export default UISlice.reducer;
