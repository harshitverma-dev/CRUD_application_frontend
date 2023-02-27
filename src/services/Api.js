import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./helper";

export const registerApi = async (data, header) => {
    return await commonRequest("POST", `${BASE_URL}/user/register`, data, header);
}

export const allUsersDataApi = async (search, gender, status, sort) => {
    return await commonRequest("GET", `${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}`, "");
}

export const singleUserDataApi = async (id) => {
    return await commonRequest("GET", `${BASE_URL}/userprofile/${id}`, "");
}

export const updateUserApi = async (id, data, header) => {
    return await commonRequest("PUT", `${BASE_URL}/edit/${id}`, data, header);
}

export const deleteSingleUserApi = async (id) => {
    return await commonRequest("DELETE", `${BASE_URL}/user/delete/${id}`);
}

export const updateUserStatusApi = async (id, data) => {
    return await commonRequest("PUT", `${BASE_URL}/user/status/${id}`, { data })
}

export const exportToCsvApi = async () => {
    return await commonRequest("GET", `${BASE_URL}/userexport`, "");
}