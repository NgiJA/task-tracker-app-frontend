import { FaCircleUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
	const { user, logout } = useAuth();
	const [isOpenProfile, setIsOpenProfile] = useState(false);
	const navigate = useNavigate();

	const userLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div>
			<FaCircleUser
				className="w-[30px] h-[30px] cursor-pointer text-[#505050]"
				onClick={() => setIsOpenProfile(!isOpenProfile)}
			/>
			{isOpenProfile && (
				<div className="flex flex-col justify-center items-center gap-[3px] absolute w-[250px] h-[100px] bg-[#F9F9F9] right-[50px] top-[70px] border-0 rounded-md">
					<div className="flex justify-between items-center w-[230px] h-[40px] hover:bg-[#EEEEEE] border-0 rounded px-2 cursor-pointer">
						<FaCircleUser className="w-[25px] h-[25px] text-[#505050]" />
						<p className="font-normal text-[16px] text-[#505050]">
							{user.firstName} {user.lastName}
						</p>
					</div>
					<div className="w-[230px] h-[1px] bg-[#D0D0D0]"></div>
					<div
						className="flex justify-between items-center w-[230px] h-[40px] hover:bg-[#EEEEEE] border-0 rounded px-2 cursor-pointer"
						onClick={userLogout}
					>
						<IoLogOut className="w-[30px] h-[30px] text-[#505050]" />
						<p className="font-normal text-[16px] text-[#505050]">ออกจากระบบ</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default UserProfile;
