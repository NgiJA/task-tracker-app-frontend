const USER_ACCESS_TOKEN = "USER_ACCESS_TOKEN";

export const getUserAccessToken = () => localStorage.getItem(USER_ACCESS_TOKEN);

export const addUserAccessToken = (token) =>
	localStorage.setItem(USER_ACCESS_TOKEN, token);

export const removeUserAccessToken = () =>
	localStorage.removeItem(USER_ACCESS_TOKEN);
