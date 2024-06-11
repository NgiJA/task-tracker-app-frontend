import axios from "../config/axios";

export const sendEmail = (input) => axios.post("/email/send", input);
