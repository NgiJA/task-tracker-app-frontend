import { useState, useEffect, createContext, useContext } from "react";
import * as authService from "../api/authApi";
import * as featureService from "../api/featureApi";
import {
	getUserAccessToken,
	addUserAccessToken,
	removeUserAccessToken
} from "../utils/localStorage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(false);

	const getUser = async () => {
		const token = getUserAccessToken();
		const res = await featureService.getUser(token);
		setUser(res.data.user);
	};

	const register = async (input) => {
		await authService.register(input);
	};

	const login = async (input) => {
		const res = await authService.login(input);
		addUserAccessToken(res.data.token);
		getUser();
	};

	const logout = () => {
		setUser(false);
		removeUserAccessToken();
	};

	useEffect(() => {
		if (getUserAccessToken()) {
			getUser();
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user: user,
				register: register,
				login: login,
				logout: logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContextProvider;
