import moment from "moment";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Switch from "@mui/material/Switch"; //url reference: https://mui.com/material-ui/react-switch/
import { useState } from "react";
import ModalEditTask from "./ModalEditTask";

function TodoItem({ item, toggleTask, deleteTask, fetchTodolist }) {
	const [isOpenModalEditTask, setIsOpenModalEditTask] = useState(false);

	const openModalEditTask = () => {
		setIsOpenModalEditTask(true);
	};

	const closeModalEditTask = () => {
		setIsOpenModalEditTask(false);
	};

	return (
		<>
			<tr>
				<td className="font-light text-[#505050] text-left pl-[10px]">
					{moment(item.date).format("DD-MM-YYYY")}
				</td>
				<td className="font-light text-[#505050] text-left pl-[10px]">
					{item.task}
				</td>
				<td className="font-light text-[#505050] text-center">
					<span
						className="inline-block align-middle"
						onChange={() => toggleTask(item.id)}
					>
						<Switch checked={item.status === "Done" ? true : false} />
					</span>
				</td>
				<td className="font-light text-[#505050] text-center">
					<span
						className="inline-block align-middle"
						onClick={openModalEditTask}
					>
						<RiPencilFill className="w-[20px] h-[20px] hover:text-black cursor-pointer" />
					</span>
				</td>
				<td className="font-light text-[#505050] text-center">
					<span
						className="inline-block align-middle"
						onClick={() => deleteTask(item.id)}
					>
						<MdDelete className="w-[20px] h-[20px] text-[#FF3F5B] hover:text-[#F20023] cursor-pointer" />
					</span>
				</td>
			</tr>
			<ModalEditTask
				isOpenModalEditTask={isOpenModalEditTask}
				closeModalEditTask={closeModalEditTask}
				item={item}
				fetchTodolist={fetchTodolist}
			/>
		</>
	);
}

export default TodoItem;
