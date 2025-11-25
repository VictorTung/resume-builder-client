import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import type { TRootState } from "../app/store";
import Loader from "../components/Loader";
import Login from "./Login";

const Layout = () => {
	const { user, loading } = useSelector((state: TRootState) => state.auth);

	if (loading) {
		return <Loader />;
	}

	return (
		<div>
			{user ? (
				<div className="min-h-screen bg-gray-50">
					<Navbar />
					<Outlet />
				</div>
			) : (
				<Login />
			)}
		</div>
	);
};

export default Layout;
