import Header from "../components/Header";
import { getUserAccessToken } from "../utils/localStorage";
import * as featureService from "../api/featureApi";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFormDownload from "../components/PDFFormDownload";
import { FaFilePdf } from "react-icons/fa";

function PDFPage({ user }) {
	const [todolist, setTodolist] = useState([]);
	const [page, setPage] = useState(1);

	// Function to convert date string to month-year key
	function getMonthYear(dateStr) {
		const dateObj = new Date(dateStr);
		const month = dateObj.toLocaleString("en-US", { month: "long" });
		const year = dateObj.getFullYear();
		return `${month}-${year}`;
	}

	// Group tasks by month-year
	const groupedTodolist = {};
	todolist.forEach((task) => {
		const monthYear = getMonthYear(task.date);
		if (!groupedTodolist[monthYear]) {
			groupedTodolist[monthYear] = [];
		}
		groupedTodolist[monthYear].push(task);
	});

	// Convert object to array of arrays
	const todolistByMonthYear = Object.entries(groupedTodolist);

	const countPage = Math.ceil(todolistByMonthYear.length / 10);

	const convertUTCToLocal = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
	};

	const increasePage = () => {
		if (page < countPage) {
			setPage(page + 1);
		}
	};

	const decreasePage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const changePageByInput = (e) => {
		const value = parseInt(e.target.value, 10);
		if (!isNaN(value) && value >= 1 && value <= countPage) {
			setPage(value);
		}
	};

	const fetchTodolist = async () => {
		const token = getUserAccessToken();
		const res = await featureService.getTask(token);
		setTodolist(res.data.task);

		// Map over the fetched data and convert dates to Bangkok timezone
		const updatedTodolist = res.data.task.map((item) => ({
			...item,
			date: convertUTCToLocal(item.date),
			createdAt: convertUTCToLocal(item.createdAt),
			updatedAt: convertUTCToLocal(item.updatedAt)
		}));

		setTodolist(updatedTodolist);
	};

	useEffect(() => {
		fetchTodolist();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="flex flex-col flex-1 h-screen">
			<Header pageName={"รายงาน PDF"} />
			<div className="flex-1 pl-[30px] pr-[50px] pt-[20px] pb-[20px]">
				<div className="flex flex-col gap-[15px]">
					<h2 className="text-[25px] text-[#505050]">รายงาน PDF</h2>
					<table className="todolist-table">
						<tbody>
							<tr>
								<th className="font-medium text-[#505050] w-[50%] text-center pl-[10px]">
									เดือน
								</th>
								<th className="font-medium text-[#505050] w-[50%] text-center pl-[10px]">
									Export to PDF
								</th>
							</tr>
							{todolistByMonthYear.length > 0 ? (
								todolistByMonthYear.map((item) => (
									<tr key={item[0]}>
										<td className="font-light text-[#505050] text-center pl-[10px]">
											{item[0]}
										</td>
										<td className="font-light text-[#505050] text-center">
											<span className="inline-block align-middle">
												<PDFDownloadLink
													fileName={`${item[0]} To-Do List Report`}
													document={
														<PDFFormDownload todolist={item[1]} user={user} />
													}
												>
													<FaFilePdf />
												</PDFDownloadLink>
											</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td className="font-light text-[#505050] text-left pl-[10px]"></td>
									<td className="font-light text-[#505050] text-left pl-[10px]"></td>
								</tr>
							)}
						</tbody>
					</table>
					<Pagination
						page={page}
						countPage={countPage}
						increasePage={increasePage}
						decreasePage={decreasePage}
						changePageByInput={changePageByInput}
					/>
				</div>
			</div>
		</div>
	);
}

export default PDFPage;
