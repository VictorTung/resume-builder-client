import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useAppDispatch } from "./app/store";
import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
	const dispatch = useAppDispatch();

	const getUserData = async () => {
		const token = localStorage.getItem("token");
		dispatch(setLoading(true));
		try {
			if (token) {
				const { data } = await api.get("/api/users/data", { headers: { Authorization: `Bearer ${token}` } });
				if (data.user) {
					dispatch(login({ user: data.user, token }));
				}
			}
			dispatch(setLoading(false));
		} catch (error) {
			dispatch(setLoading(false));
			const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
			console.log(errorMessage);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="app" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="builder/:resumeId" element={<ResumeBuilder />} />
				</Route>

				<Route path="view/:resumeId" element={<Preview />} />
				<Route path="login" element={<Login />} />
			</Routes>
		</>
	);
};

export default App;
