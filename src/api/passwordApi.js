import axios from "../config/axios";

export const resetPassword = (input) => axios.post("/password/reset", input);
