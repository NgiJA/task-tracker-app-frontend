import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupPage() {
	const { register } = useAuth();
	const { startLoading, stopLoading } = useLoading();
	const navigate = useNavigate();
	const [input, setInput] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		firstName: "",
		lastName: ""
	});

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			startLoading();
			await register(input);
			navigate("/");
			toast.success("success register");
		} catch (err) {
			console.log(err);
			toast.error(err.response.data.message);
		} finally {
			stopLoading();
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-[450px] h-[570px]">
				<form
					className="flex flex-col justify-evenly h-[100%]"
					onSubmit={handleSubmitForm}
				>
					<h2 className="font-semibold text-[40px] text-[#505050]">
						Create Account
					</h2>
					<p className="font-light text-[16px] text-[#a0a0a0]">
						Please create your account
					</p>
					<input
						className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
						type="text"
						name="email"
						placeholder="Email address"
						value={input.email}
						onChange={handleChangeInput}
					/>
					<input
						className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
						type="text"
						name="password"
						placeholder="Password"
						value={input.password}
						onChange={handleChangeInput}
					/>
					<input
						className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
						type="text"
						name="confirmPassword"
						placeholder="Confirm Password"
						value={input.confirmPassword}
						onChange={handleChangeInput}
					/>
					<input
						className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
						type="text"
						name="firstName"
						placeholder="First Name"
						value={input.firstName}
						onChange={handleChangeInput}
					/>
					<input
						className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
						type="text"
						name="lastName"
						placeholder="Last Name"
						value={input.lastName}
						onChange={handleChangeInput}
					/>
					<button className="w-[100%] h-[60px] border rounded-lg bg-[#10a37f] font-medium text-[24px] text-white">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignupPage;
