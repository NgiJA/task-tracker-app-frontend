import Header from "../components/Header";
import { RiFileExcel2Fill } from "react-icons/ri";
import Datepicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { getUserAccessToken } from "../utils/localStorage";
import * as featureService from "../api/featureApi";
import moment from "moment";
import Switch from "@mui/material/Switch"; //url reference: https://mui.com/material-ui/react-switch/
import Pagination from "../components/Pagination";
import { CSVLink } from "react-csv";

function ExcelPage() {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [todolist, setTodolist] = useState([]);
	const [filteredTodolist, setFilteredTodolist] = useState([]);
	const [page, setPage] = useState(1);

	const countPage = Math.ceil(filteredTodolist.length / 10);
	const displayTodolist = filteredTodolist.slice(page * 10 - 10, page * 10);

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

		// Map over the fetched data and convert dates to Bangkok timezone
		const updatedTodolist = res.data.task.map((item) => ({
			...item,
			date: convertUTCToLocal(item.date),
			createdAt: convertUTCToLocal(item.createdAt),
			updatedAt: convertUTCToLocal(item.updatedAt)
		}));

		setTodolist(updatedTodolist);
	};

	const filterTodolist = () => {
		if (!startDate || !endDate) {
			setFilteredTodolist(todolist);
		} else {
			const filtered = todolist.filter((item) => {
				const itemDate = new Date(item.date);
				return itemDate >= startDate && itemDate <= endDate;
			});
			setFilteredTodolist(filtered);

			// setPage again if there is no data in current page
			const countPage = Math.ceil(filtered.length / 10);
			if (page > countPage) {
				setPage(countPage);
			}
		}
	};

	useEffect(() => {
		fetchTodolist();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		filterTodolist();
		// eslint-disable-next-line
	}, [startDate, endDate, todolist]);

	return (
		<div className="flex flex-col flex-1 h-screen">
			<Header pageName={"รายงาน Excel"} />
			<div className="flex-1 pl-[30px] pr-[50px] pt-[20px] pb-[20px]">
				<div className="flex flex-col gap-[15px]">
					<h2 className="text-[25px] text-[#505050]">รายงาน Excel</h2>
					<div className="flex justify-end gap-[15px]">
						<div className="flex items-center relative gap-[15px]">
							<label className="flex items-center gap-[10px] font-medium text-[#505050]">
								วันที่เริ่มต้น
								<div className="flex items-center relative">
									<Datepicker
										className="text-center border-b w-[140px] text-[#505050] outline-none"
										dateFormat="dd/MM/YYYY"
										selected={startDate}
										onChange={(date) => setStartDate(date)}
									/>
									<FaCalendarAlt className="cursor-pointer w-[20px] h-[20px] ml-[10px]" />
								</div>
							</label>

							<label className="flex items-center gap-[10px] font-medium text-[#505050]">
								วันที่สิ้นสุด
								<div className="flex items-center relative">
									<Datepicker
										className="text-center border-b w-[140px] text-[#505050] outline-none"
										dateFormat="dd/MM/YYYY"
										selected={endDate}
										onChange={(date) => setEndDate(date)}
									/>
									<FaCalendarAlt className="cursor-pointer w-[20px] h-[20px] ml-[10px]" />
								</div>
							</label>
						</div>
						<CSVLink
							className="flex justify-center items-center gap-2 w-[170px] h-[40px] bg-[#9CC5BB] hover:bg-[#98BAB2] border rounded-md"
							data={filteredTodolist}
							filename="excel-report"
						>
							<RiFileExcel2Fill className="w-[25px] h-[25px] text-[#505050]" />
							<p className="text-[16px] text-white">Export to Excel</p>
						</CSVLink>
						{/* <button className="flex justify-center items-center gap-2 w-[170px] h-[40px] bg-[#9CC5BB] hover:bg-[#98BAB2] border rounded-md">
							<RiFileExcel2Fill className="w-[25px] h-[25px] text-[#505050]" />
							<p className="text-[16px] text-white">Export to Excel</p>
						</button> */}
					</div>
					<table className="todolist-table">
						<tbody>
							<tr>
								<th className="font-medium text-[#505050] w-[20%] text-left pl-[10px]">
									วันที่
								</th>
								<th className="font-medium text-[#505050] w-[70%] text-left pl-[10px]">
									ชื่องาน
								</th>
								<th className="font-medium text-[#505050] w-[10%]">สถานะ</th>
							</tr>
							{displayTodolist.length > 0 ? (
								displayTodolist.map((item) => (
									<tr key={item.id}>
										<td className="font-light text-[#505050] text-left pl-[10px]">
											{moment(item.date).format("DD-MM-YYYY")}
										</td>
										<td className="font-light text-[#505050] text-left pl-[10px]">
											{item.task}
										</td>
										<td className="font-light text-[#505050] text-center">
											<span className="inline-block align-middle">
												<Switch
													checked={item.status === "Done" ? true : false}
												/>
											</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td className="font-light text-[#505050] text-left pl-[10px]"></td>
									<td className="font-light text-[#505050] text-left pl-[10px]"></td>
									<td className="font-light text-[#505050] text-center">
										<span className="inline-block align-middle"></span>
									</td>
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

export default ExcelPage;
