import axios from "../config/axios";

export const register = (input) => axios.post("/auth/signup", input);
export const login = (input) => axios.post("/auth/login", input);
export const googleLogin = (input) => axios.post("/auth/googlelogin", input);
