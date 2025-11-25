import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
	user: { name: string; email: string } | null;
	token: string | null;
	loading: boolean;
};

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: null,
		loading: false,
	} as TAuthState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem("token");
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
