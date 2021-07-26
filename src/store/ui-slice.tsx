import { createSlice } from "@reduxjs/toolkit";

type state = {
    notification: {
        open: boolean;
        message: string | null;
        type: null | 'error' | 'warning' | 'info' | 'success' 
    };
    isLoading: boolean;
    entryInfoAccepted: boolean;
}

const initialState:state = {
  notification: {
    open: false,
    message: null,
    type: null,
  },
  isLoading: false,
  entryInfoAccepted: false
};

const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    setLoading(state:state, action) {
      state.isLoading = action.payload;
    },
    setNotification(state:state, action) {
      state.notification = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    closeNotifiaction(state:state) {
      state.notification = {
        ...state.notification,
        open: false,
      };
    },
    acceptEntryInfo(state:state) {
      state.entryInfoAccepted = true
    }
  },
});

export const UIActions = UISlice.actions;

export default UISlice.reducer;
