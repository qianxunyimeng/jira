import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-panel";

import * as auth from "auth-provide";
import { AuthForm } from "context/auth-context";
import { AppDispatch } from "store";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const login = (form: AuthForm) => {
  return (dispatch: AppDispatch) => {
    auth.login(form).then((user) => dispatch(setUser(user)));
  };
};
