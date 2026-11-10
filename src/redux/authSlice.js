import { createSlice } from "@reduxjs/toolkit";

function loadSavedAuth() {
  try {
    const saved = localStorage.getItem("ecommerce_auth");

    if (!saved) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }

    const parsed = JSON.parse(saved);

    if (!parsed.token || !parsed.user) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }

    return {
      user: parsed.user,
      token: parsed.token,
      isAuthenticated: true,
    };
  } catch {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: loadSavedAuth(),
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;