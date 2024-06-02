import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
	const { login } = useAuth();
	const { startLoading, stopLoading } = useLoading();
	const navigate = useNavigate();
	const [input, setInput] = useState({
		email: "",
		password: ""
	});

	const handleChangeInput = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		try {
			startLoading();
			await login(input);
			navigate("/todolist");
			toast.success("success login");
		} catch (err) {
			console.log(err);
			toast.error(err.response.data.message);
		} finally {
			stopLoading();
		}
	};

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
						<div className="flex justify-between">
							<div className="flex items-center">
								<input type="checkbox" name="remember" />
								<label className="remember" htmlFor="remember">
									Remember me
								</label>
							</div>
							<p className="forgotpassword">Forgot Password ?</p>
						</div>
						<button className="loginbutton">Log in</button>
						<div className="flex justify-between items-center">
							<div className="line-loginoption"></div>
							<p className="or-login-with">Or Log In with</p>
							<div className="line-loginoption"></div>
						</div>
						<div className="flex justify-center items-center">
							<FcGoogle className="icon-google" />
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
