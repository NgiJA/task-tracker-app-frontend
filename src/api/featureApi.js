import axios from "../config/axios";

export const getUser = (token) =>
	axios.get("/feature/user", {
		headers: { Authorization: "Bearer " + token }
	});

export const getTask = (token) =>
	axios.get("/feature/gettask", {
		headers: { Authorization: "Bearer " + token }
	});

export const createTask = (token, input) =>
	axios.post("/feature/createtask", input, {
		headers: { Authorization: "Bearer " + token }
	});

export const deleteTask = (token, taskId) =>
	axios.delete(`/feature/deletetask/${taskId}`, {
		headers: { Authorization: "Bearer " + token }
	});

export const toggleTask = (token, taskId) =>
	axios.patch(
		`/feature/toggletask/${taskId}`,
		{},
		{
			headers: { Authorization: "Bearer " + token }
		}
	);

export const editTask = (token, taskId, input) =>
	axios.patch(`/feature/edittask/${taskId}`, input, {
		headers: { Authorization: "Bearer " + token }
	});
