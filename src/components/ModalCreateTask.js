import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import * as featureService from "../api/featureApi";
import { getUserAccessToken } from "../utils/localStorage";
import { useLoading } from "../contexts/LoadingContext";

function ModalCreateTask({
	isOpenModalCreateTask,
	closeModalCreateTask,
	fetchTodolist
}) {
	const [date, setDate] = useState();
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const { startLoading, stopLoading } = useLoading();

	const clearInput = () => {
		setDate(null);
		setTask("");
	};

	const addTask = () => {
		const item = { date, task };
		if (date && task) {
			setTaskList((prevTaskList) => [...prevTaskList, item]);
		}
		clearInput();
	};

	const deleteTask = (index) => {
		setTaskList((prevTaskList) => prevTaskList.filter((_, i) => i !== index));
	};

	const save = async () => {
		try {
			const token = getUserAccessToken();
			startLoading();
			await featureService.createTask(token, taskList);
			await fetchTodolist();
			setTaskList([]);
			closeModalCreateTask();
		} catch (err) {
			console.log(err);
		} finally {
			stopLoading();
		}
	};

	return (
		<>
			{isOpenModalCreateTask ? (
				<>
					<div
						onClick={() => {
							clearInput();
							closeModalCreateTask();
						}}
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<div
							className="flex flex-col w-[900px] h-[600px]"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="flex justify-between items-center w-[100%] h-[70px] bg-[#9CC5BB] px-[35px]">
								<p className="text-[18px] text-white">สร้างรายการใหม่</p>
								<button
									onClick={() => {
										clearInput();
										closeModalCreateTask();
									}}
								>
									<IoMdClose className="w-[30px] h-[30px] text-white" />
								</button>
							</div>
							<div className="w-[100%] h-[530px] bg-white px-[35px] py-[30px]">
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
										<button className="absolute right-0" onClick={addTask}>
											<FaSquarePlus className="w-[30px] h-[30px] text-[#505050] hover:text-black" />
										</button>
									</div>
									{taskList.length > 0 ? (
										<>
											<table className="tasklist-table mt-[50px]">
												<tbody>
													<tr>
														<th className="font-medium text-[#505050] w-[30%] text-left pl-[10px]">
															วันที่
														</th>
														<th className="font-medium text-[#505050] w-[60%] text-left pl-[10px]">
															ชื่องาน
														</th>
														<th className="font-medium text-[#505050] w-[10%]">
															ลบ
														</th>
													</tr>
													{taskList.map((item, index) => (
														<tr key={index}>
															<td className="font-light text-[#505050] text-left pl-[10px]">
																{moment(item.date).format("DD-MM-YYYY")}
															</td>
															<td className="font-light text-[#505050] text-left pl-[10px]">
																{item.task}
															</td>
															<td className="font-light text-[#505050] text-center">
																<span
																	className="inline-block align-middle"
																	onClick={() => deleteTask(index)}
																>
																	<MdDelete className="w-[20px] h-[20px] text-[#FF3F5B] hover:text-[#F20023] cursor-pointer" />
																</span>
															</td>
														</tr>
													))}
												</tbody>
											</table>
											<div className="flex justify-end items-end flex-grow">
												<button
													className="flex justify-center items-center gap-2 w-[115px] h-[50px] bg-[#9CC5BB] hover:bg-[#98BAB2] border rounded-md"
													onClick={save}
												>
													<p className="text-[16px] text-white">บันทึก</p>
												</button>
											</div>
										</>
									) : (
										<div className="flex justify-center items-center flex-grow">
											<p className="text-[#505050] text-[18px]">
												ยังไม่มีรายการถูกสร้าง
											</p>
										</div>
									)}
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

export default ModalCreateTask;
