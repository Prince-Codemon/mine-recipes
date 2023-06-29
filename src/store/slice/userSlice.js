import { createSlice } from "@reduxjs/toolkit";
import decode from "jwt-decode";
function getToken() {
  const login = localStorage.getItem("[3{]df23}]");
  if (login) {
    const { exp } = decode(login);
    if (exp < new Date().getTime() / 1000) {
      localStorage.removeItem("[3{]df23}]");
      return null;
    }
    return JSON.parse(login);
  }
  return null;
}
function getUserId() {
  const login = localStorage.getItem("[3{]df23}]");
  if (login) {
    const { exp, id } = decode(login);
    if (exp < new Date().getTime() / 1000) {
      localStorage.removeItem("[3{]df23}]");
      return null;
    }
    return id;
  }
  return null;
}

const initialState = {
  user: getUserId(),
  token: getToken(),
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.type = action.payload.type;
      state.user = getUserId()
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.type = "user";
      localStorage.removeItem("[3{]df23}]");
    },
  
  },
});

export const { loginUser, logout } = userSlice.actions;
export default userSlice.reducer;
