import "react-toastify/dist/ReactToastify.css";
import Router from "./route/Route";
import { ToastContainer } from "react-toastify";
import { useLoading } from "./contexts/LoadingContext";
import SpinnerLoading from "./components/SpinnerLoading";

function App() {
	const { loading } = useLoading();
	return (
		<>
			{loading && <SpinnerLoading />}
			<Router />
			<ToastContainer autoClose="2500" theme="colored" />
		</>
	);
}

export default App;
