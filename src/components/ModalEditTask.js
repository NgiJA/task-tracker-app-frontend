import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as featureService from "../api/featureApi";
import { getUserAccessToken } from "../utils/localStorage";
import { useLoading } from "../contexts/LoadingContext";

function ModalEditTask({
	isOpenModalEditTask,
	closeModalEditTask,
	item,
	fetchTodolist
}) {
	const [date, setDate] = useState(item.date);
	const [task, setTask] = useState(item.task);
	const { startLoading, stopLoading } = useLoading();

	const save = async (id) => {
		try {
			const token = getUserAccessToken();
			const todo = { date, task };
			startLoading();
			await featureService.editTask(token, id, todo);
			await fetchTodolist();
			closeModalEditTask();
		} catch (err) {
			console.log(err);
		} finally {
			stopLoading();
		}
	};

	return (
		<>
			{isOpenModalEditTask ? (
				<>
					<div
						onClick={() => {
							closeModalEditTask();
						}}
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<div
							className="flex flex-col w-[900px] h-[220px]"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex justify-between items-center w-[100%] h-[70px] bg-[#9CC5BB] px-[35px]">
								<p className="text-[18px] text-white">แก้ไขรายการ</p>
								<button
									onClick={() => {
										closeModalEditTask();
									}}
								>
									<IoMdClose className="w-[30px] h-[30px] text-white" />
								</button>
							</div>
							<div className="w-[100%] h-[150px] bg-white px-[35px] py-[30px]">
								<div className="flex flex-col w-[100%] h-[100%]">
									<div className="flex items-center relative">
										<div className="flex items-center">
											<label className="flex items-center gap-[10px] font-medium text-[#505050] relative">
												วันที่
												<Datepicker
													className="text-center border-b w-[140px] text-[#505050] outline-none"
													dateFormat="dd/MM/YYYY"
													selected={date}
													onChange={(date) => setDate(date)}
												/>
												<FaCalendarAlt className="cursor-pointer absolute left-[185px] w-[20px] h-[20px]" />
											</label>
										</div>
										<div className="flex items-center gap-[10px] absolute left-[250px]">
											<label
												className="font-medium text-[#505050]"
												htmlFor="task"
											>
												ชื่องาน
											</label>
											<input
												className="border-b w-[450px] pl-[10px] text-[#505050] outline-none"
												type="text"
												name="task"
												id="task"
												onChange={(e) => setTask(e.target.value)}
												value={task}
											/>
										</div>
									</div>
									<div className="flex justify-end items-end flex-grow">
										<button
											className="flex justify-center items-center gap-2 w-[115px] h-[50px] bg-[#9CC5BB] hover:bg-[#98BAB2] border rounded-md"
											onClick={() => save(item.id)}
										>
											<p className="text-[16px] text-white">บันทึก</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}

export default ModalEditTask;
