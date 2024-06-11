import axios from "../config/axios";

export const verifyOTP = (input) => axios.post("/otp/verify", input);
