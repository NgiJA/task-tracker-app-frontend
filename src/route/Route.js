import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import TodolistPage from "../pages/TodolistPage";
import ExcelPage from "../pages/ExcelPage";
import PDFPage from "../pages/PDFPage";

function Router() {
	const { user } = useAuth();

	return (
		<Routes>
			{user ? (
				<>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<TodolistPage />} />
						<Route path="/todolist" element={<TodolistPage />} />
						<Route path="/excelreport" element={<ExcelPage />} />
						<Route path="/pdfreport" element={<PDFPage user={user} />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</>
			) : (
				<>
					<Route path="/" element={<LoginPage />} />
					<Route path="/register" element={<SignupPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</>
			)}
		</Routes>
	);
}

export default Router;
