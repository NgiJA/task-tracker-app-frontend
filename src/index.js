import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoadingContextProvider from "./contexts/LoadingContext";
import AuthContextProvider from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<BrowserRouter>
		<GoogleOAuthProvider clientId="148013273968-gvjdqh1db1ehtqsnr93b3030dvc0dekc.apps.googleusercontent.com">
			<LoadingContextProvider>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</LoadingContextProvider>
		</GoogleOAuthProvider>
	</BrowserRouter>

	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
