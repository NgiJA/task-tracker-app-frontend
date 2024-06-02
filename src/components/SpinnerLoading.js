import { FadeLoader } from "react-spinners";

function SpinnerLoading() {
	return (
		<div
			className="flex flex-col justify-center items-center absolute w-screen h-screen bg-black bg-opacity-40"
			style={{ zIndex: 1000 }}
		>
			<FadeLoader color="#10a37f" height={30} margin={10} width={4} />
		</div>
	);
}

export default SpinnerLoading;
