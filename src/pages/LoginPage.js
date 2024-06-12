import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";

function LoginPage() {
	const { login, loginWithGoogle } = useAuth();
	const { startLoading, stopLoading } = useLoading();
	const navigate = useNavigate();
	const [input, setInput] = useState({
		email: "",
		password: ""
	});
	const [rememberMe, setRememberMe] = useState(false);

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleRememberMeChange = (e) => {
		setRememberMe(e.target.checked);
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			startLoading();
			await login(input);

			if (rememberMe) {
				localStorage.setItem("rememberMe", true);
				localStorage.setItem("email", input.email);
			} else {
				localStorage.removeItem("rememberMe");
				localStorage.removeItem("email");
			}

			navigate("/todolist");
			toast.success("success login");
		} catch (err) {
			console.log(err);
			toast.error(err.response.data.message);
		} finally {
			stopLoading();
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const { access_token } = tokenResponse;
			try {
				// Fetch user information using the access token
				const userInfo = await axios.get(
					"https://www.googleapis.com/oauth2/v3/userinfo",
					{
						headers: {
							Authorization: `Bearer ${access_token}`
						}
					}
				);

				startLoading();
				await loginWithGoogle(userInfo.data);
				navigate("/todolist");
				toast.success("success login");
			} catch (error) {
				console.error("Error fetching user info:", error);
			} finally {
				stopLoading();
			}
		},
		onError: () => console.log("Login Failed")
	});

	useEffect(() => {
		const remembered = localStorage.getItem("rememberMe") === "true";
		if (remembered) {
			setInput({
				email: localStorage.getItem("email") || ""
			});
			setRememberMe(true);
		}
	}, []);

	return (
		<div className="parent">
			<div className="title">
				<div className="title-container">
					<h1>To-Do List App</h1>
					<h2>Plan your tasks</h2>
					<h2>Help to memorize to do things</h2>
				</div>
			</div>
			<div className="login">
				<div className="login-outside-container">
					<form className="login-inside-container" onSubmit={handleSubmitForm}>
						<h2>Log in</h2>
						<p className="welcome">
							Welcome back! Please log into your account
						</p>
						<input
							className="textinput"
							type="text"
							name="email"
							placeholder="Email address"
							value={input.email}
							onChange={handleChangeInput}
						/>
						<input
							className="textinput"
							type="password"
							name="password"
							placeholder="Password"
							value={input.password}
							onChange={handleChangeInput}
						/>
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-[5px]">
								<Checkbox
									className="h-[25px] !p-0"
									sx={{
										color: "#c0c0c0",
										"&.Mui-checked": {
											color: "#10A37F"
										}
									}}
									name="remember"
									checked={rememberMe}
									onChange={handleRememberMeChange}
								/>
								<label className="remember" htmlFor="remember">
									Remember me
								</label>
							</div>
							<p
								className="forgotpassword"
								onClick={() => navigate("/resetpassword")}
							>
								Forgot Password ?
							</p>
						</div>
						<button className="loginbutton">Log in</button>
						<div className="flex justify-between items-center">
							<div className="line-loginoption"></div>
							<p className="or-login-with">Or Log In with</p>
							<div className="line-loginoption"></div>
						</div>
						<div className="flex justify-center items-center">
							<FcGoogle
								className="icon-google cursor-pointer"
								onClick={() => googleLogin()}
							/>
						</div>
						<div className="flex justify-center items-center gap-2">
							<span className="new-user">New user ?</span>
							<Link className="signup" to="/register">
								Sign up
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
