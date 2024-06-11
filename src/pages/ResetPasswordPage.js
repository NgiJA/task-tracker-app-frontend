import { useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import * as emailService from "../api/emailApi";
import * as otpService from "../api/otpApi";
import * as passwordService from "../api/passwordApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState(Array(6).fill(""));
	const [newPassword, SetNewPassword] = useState("");
	const [confirmNewPassword, SetConfirmNewPassword] = useState("");
	const [step, setStep] = useState("step-1");
	const { startLoading, stopLoading } = useLoading();
	const navigate = useNavigate();

	const handleChange = (element, index) => {
		const value = element.value;
		if (!/^[0-9]$/.test(value) && value !== "") return; // Allow only digits

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Move to the next input box if the current one is filled
		if (value !== "" && index < otp.length - 1) {
			document.getElementById(`otp-${index + 1}`).focus();
		}
	};

	const handleKeyDown = (event, index) => {
		if (event.key === "Backspace" && otp[index] === "" && index > 0) {
			document.getElementById(`otp-${index - 1}`).focus();
		}
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			if (step === "step-1") {
				startLoading();
				const res = await emailService.sendEmail({ email });
				if (res.data) {
					setOtp(Array(6).fill("")); //setOtp เป็นค่าเริ่มต้นเพื่อ clear ข้อมูลออกในกรณีมีข้อมูลอยู่ก่อนหน้า
					setStep("step-2");
					toast.success(res.data.message);
				}
			} else if (step === "step-2") {
				const otpString = otp.join("");
				startLoading();
				const result = await otpService.verifyOTP({
					email: email,
					otp: otpString
				});

				if (result.data.message === "OTP verified" && result.data.token) {
					localStorage.setItem("resetPasswordToken", result.data.token);
					setStep("step-3");
				}
			} else if (step === "step-3") {
				const verifyOTP = localStorage.getItem("resetPasswordToken");
				startLoading();
				const res = await passwordService.resetPassword({
					token: verifyOTP,
					newPassword: newPassword,
					confirmNewPassword: confirmNewPassword
				});

				if (res.data) {
					navigate("/");
					localStorage.removeItem("resetPasswordToken");
					toast.success(res.data.message);
					setOtp(Array(6).fill(""));
				}
			}
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
					className="flex flex-col justify-center gap-[20px] h-[100%]"
					onSubmit={handleSubmitForm}
				>
					{step === "step-1" ? (
						<>
							<div>
								<h2 className="font-semibold text-[40px] text-[#505050]">
									Reset Password
								</h2>
								<p className="font-light text-[16px] text-[#a0a0a0]">
									Enter the email address you used to register with
								</p>
							</div>
							<input
								className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
								type="text"
								name="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<button className="w-[100%] h-[60px] border rounded-lg bg-[#10a37f] font-medium text-[24px] text-white hover:bg-[#0d9573]">
								Send OTP
							</button>
						</>
					) : step === "step-2" ? (
						<>
							<div>
								<h2 className="font-semibold text-[40px] text-[#505050]">
									Reset Password
								</h2>
								<p className="font-light text-[16px] text-[#a0a0a0]">
									Enter your OTP
								</p>
							</div>
							<div className="flex justify-center gap-[23px]">
								{otp.map((data, index) => (
									<input
										className="w-[55px] h-[65px] bg-[#DEF3EE] text-center border-0 rounded"
										key={index}
										id={`otp-${index}`}
										type="text"
										maxLength="1"
										value={data}
										onChange={(e) => handleChange(e.target, index)}
										onKeyDown={(e) => handleKeyDown(e, index)}
									/>
								))}
							</div>
							<p
								className="font-light text-[16px] text-[#10A37F] text-right cursor-pointer"
								onClick={() => setStep("step-1")}
							>
								Didn’t recieve code
							</p>
							<button className="w-[100%] h-[60px] border rounded-lg bg-[#10a37f] font-medium text-[24px] text-white hover:bg-[#0d9573]">
								Submit
							</button>
						</>
					) : (
						<>
							<div>
								<h2 className="font-semibold text-[40px] text-[#505050]">
									Reset Password
								</h2>
								<p className="font-light text-[16px] text-[#a0a0a0]">
									Enter the your new password
								</p>
							</div>
							<input
								className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
								type="text"
								name="password"
								placeholder="Password"
								value={newPassword}
								onChange={(e) => SetNewPassword(e.target.value)}
							/>
							<input
								className="w-[100%] h-[50px] border rounded-lg px-4 font-light text-[14px]"
								type="text"
								name="confirmPassword"
								placeholder="Confirm Password"
								value={confirmNewPassword}
								onChange={(e) => SetConfirmNewPassword(e.target.value)}
							/>
							<button className="w-[100%] h-[60px] border rounded-lg bg-[#10a37f] font-medium text-[24px] text-white hover:bg-[#0d9573]">
								Submit
							</button>
						</>
					)}
				</form>
			</div>
		</div>
	);
}

export default ResetPasswordPage;
