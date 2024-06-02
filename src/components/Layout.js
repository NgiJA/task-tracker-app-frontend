import { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

function Layout() {
	const [pageName, setPageName] = useState("To-Do List");
	const navigate = useNavigate();

	const setPage = (menu) => {
		setPageName(menu);
		if (menu === "To-Do List") {
			navigate("/todolist");
		} else if (menu === "รายงาน Excel") {
			navigate("/excelreport");
		} else if (menu === "รายงาน PDF") {
			navigate("/pdfreport");
		}
	};

	return (
		<div className="flex w-screen h-screen">
			<Menu pageName={pageName} setPage={setPage} />
			<Outlet />
			{/* Outlet คือ สิ่งที่อยู้ใน <Route path="/" element={<Layout />}> ในหน้า Router.js */}
		</div>
	);
}

export default Layout;
