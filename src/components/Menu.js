import { RiTodoFill } from "react-icons/ri";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";

function Menu({ pageName, setPage }) {
	return (
		<div className="flex flex-col w-[320px] bg-[#F9F9F9]">
			<div className="flex items-center h-[96px] w-full bg-[#9CC5BB]">
				<p className="font-semibold text-[24px] text-white left-[30px] relative">
					Task Tracker App
				</p>
			</div>
			<div
				className={`flex items-center h-[85px] w-full border-b border-[#EEEEEE] hover:bg-[#EEEEEE] cursor-pointer ${
					pageName === "To-Do List" ? "bg-[#EEEEEE]" : "bg-[#F9F9F9]"
				}`}
				onClick={() => setPage("To-Do List")}
			>
				<div className="flex gap-3 left-[30px] relative">
					<RiTodoFill className="w-[25px] h-[25px] text-[#505050]" />
					<p className="text-[16px] text-[#505050] font-medium">To-Do List</p>
				</div>
			</div>
			<div
				className={`flex items-center h-[85px] w-full border-b border-[#EEEEEE] hover:bg-[#EEEEEE] cursor-pointer ${
					pageName === "รายงาน Excel" ? "bg-[#EEEEEE]" : "bg-[#F9F9F9]"
				}`}
				onClick={() => setPage("รายงาน Excel")}
			>
				<div className="flex gap-3 left-[30px] relative">
					<RiFileExcel2Fill className="w-[25px] h-[25px] text-[#505050]" />
					<p className="text-[16px] text-[#505050] font-medium">รายงาน Excel</p>
				</div>
			</div>
			<div
				className={`flex items-center h-[85px] w-full border-b border-[#EEEEEE] hover:bg-[#EEEEEE] cursor-pointer ${
					pageName === "รายงาน PDF" ? "bg-[#EEEEEE]" : "bg-[#F9F9F9]"
				}`}
				onClick={() => setPage("รายงาน PDF")}
			>
				<div className="flex gap-3 left-[30px] relative">
					<FaFilePdf className="w-[25px] h-[25px] text-[#505050]" />
					<p className="text-[16px] text-[#505050] font-medium">รายงาน PDF</p>
				</div>
			</div>
		</div>
	);
}

export default Menu;
