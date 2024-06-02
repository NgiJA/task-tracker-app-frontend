import Header from "../components/Header";
import { FaSquarePlus } from "react-icons/fa6";
import { getUserAccessToken } from "../utils/localStorage";
import * as featureService from "../api/featureApi";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import ModalCreateTask from "../components/ModalCreateTask";
import TodoItem from "../components/TodoItem";

function TodolistPage() {
	const [todolist, setTodolist] = useState([]);
	const [page, setPage] = useState(1);
	const [isOpenModalCreateTask, setIsOpenModalCreateTask] = useState(false);

	const countPage = Math.ceil(todolist.length / 10);
	const displayTodolist = todolist.slice(page * 10 - 10, page * 10);

	const convertUTCToLocal = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
	};

	const increasePage = () => {
		if (page < countPage) {
			setPage(page + 1);
		}
	};

	const decreasePage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const changePageByInput = (e) => {
		const value = parseInt(e.target.value, 10);
		if (!isNaN(value) && value >= 1 && value <= countPage) {
			setPage(value);
		}
	};

	const openModalCreateTask = () => {
		setIsOpenModalCreateTask(true);
	};

	const closeModalCreateTask = () => {
		setIsOpenModalCreateTask(false);
	};

	const fetchTodolist = async () => {
		const token = getUserAccessToken();
		const res = await featureService.getTask(token);
		setTodolist(res.data.task);

		// Map over the fetched data and convert dates to Bangkok timezone
		const updatedTodolist = res.data.task.map((item) => ({
			...item,
			date: convertUTCToLocal(item.date),
			createdAt: convertUTCToLocal(item.createdAt),
			updatedAt: convertUTCToLocal(item.updatedAt)
		}));

		setTodolist(updatedTodolist);
	};

	const deleteTask = async (id) => {
		const token = getUserAccessToken();
		try {
			await featureService.deleteTask(token, id);
			// Update the todolist state directly
			const updatedTodolist = todolist.filter((item) => item.id !== id);
			setTodolist(updatedTodolist);

			if (updatedTodolist.length % 10 === 0 && page > 1) {
				setPage(page - 1);
			}
		} catch (err) {
			console.error("Failed to delete task:", err);
		}
	};

	const toggleTask = async (id) => {
		const token = getUserAccessToken();
		try {
			await featureService.toggleTask(token, id);
			fetchTodolist();
		} catch (err) {
			console.error("Failed to toggle task:", err);
		}
	};

	useEffect(() => {
		fetchTodolist();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="flex flex-col flex-1 h-screen">
			<Header pageName={"To-Do List"} />
			<div className="flex-1 flex-col pl-[30px] pr-[50px] pt-[20px] pb-[20px]">
				<div className="flex flex-col gap-[15px]">
					<h2 className="text-[25px] text-[#505050]">รายการงานที่ต้องทำ</h2>
					<div className="flex justify-end">
						<button
							className="flex justify-center items-center gap-2 w-[170px] h-[40px] bg-[#9CC5BB] hover:bg-[#98BAB2] border rounded-md"
							onClick={openModalCreateTask}
						>
							<FaSquarePlus className="w-[25px] h-[25px] text-[#505050]" />
							<p className="text-[16px] text-white">สร้างรายการใหม่</p>
						</button>
					</div>
					<table className="todolist-table">
						<tbody>
							<tr>
								<th className="font-medium text-[#505050] w-[20%] text-left pl-[10px]">
									วันที่
								</th>
								<th className="font-medium text-[#505050] w-[62%] text-left pl-[10px]">
									ชื่องาน
								</th>
								<th className="font-medium text-[#505050] w-[6%]">สถานะ</th>
								<th className="font-medium text-[#505050] w-[6%]">แก้ไข</th>
								<th className="font-medium text-[#505050] w-[6%]">ลบ</th>
							</tr>
							{displayTodolist.length > 0 ? (
								displayTodolist.map((item) => (
									<TodoItem
										key={item.id}
										item={item}
										deleteTask={deleteTask}
										toggleTask={toggleTask}
										fetchTodolist={fetchTodolist}
									/>
								))
							) : (
								<tr>
									<td className="font-light text-[#505050] text-left pl-[10px]"></td>
									<td className="font-light text-[#505050] text-left pl-[10px]"></td>
									<td className="font-light text-[#505050] text-center">
										<span className="inline-block align-middle"></span>
									</td>
									<td className="font-light text-[#505050] text-center">
										<span className="inline-block align-middle"></span>
									</td>
									<td className="font-light text-[#505050] text-center">
										<span className="inline-block align-middle"></span>
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<Pagination
						page={page}
						countPage={countPage}
						increasePage={increasePage}
						decreasePage={decreasePage}
						changePageByInput={changePageByInput}
					/>
				</div>
			</div>
			<ModalCreateTask
				isOpenModalCreateTask={isOpenModalCreateTask}
				closeModalCreateTask={closeModalCreateTask}
				fetchTodolist={fetchTodolist}
			/>
		</div>
	);
}

export default TodolistPage;
