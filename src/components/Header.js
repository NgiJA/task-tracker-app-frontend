import { RiTodoFill } from "react-icons/ri";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa";
import UserProfile from "./UserProfile";

function Header({ pageName }) {
	return (
		<div className="flex items-center justify-between relative min-h-[96px] bg-[#9CC5BB] pl-[30px] pr-[50px]">
			<div className="flex items-center gap-[10px]">
				{pageName === "To-Do List" ? (
					<RiTodoFill className="w-[25px] h-[25px] text-[#505050]" />
				) : pageName === "รายงาน Excel" ? (
					<RiFileExcel2Fill className="w-[25px] h-[25px] text-[#505050]" />
				) : pageName === "รายงาน PDF" ? (
					<FaFilePdf className="w-[25px] h-[25px] text-[#505050]" />
				) : null}

				<p className="font-medium text-[18px] text-white">{pageName}</p>
			</div>
			<UserProfile />
		</div>
	);
}

export default Header;
