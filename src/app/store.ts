import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();

export default store;