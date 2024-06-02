import axios from "../config/axios";

export const register = (input) => axios.post("/auth/signup", input);
export const login = (input) => axios.post("/auth/login", input);
