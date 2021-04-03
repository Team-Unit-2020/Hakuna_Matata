import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"


export const signUpUser = (body) =>
    sendRequest("post", `${appSettings.backendUrl}/auth/new`, body);
export const activateUser = (id) =>
    sendRequest("get", `${appSettings.backendUrl}/auth/activate/${id}`, null);
export const sendPasswordResetLink = (body) =>
    sendRequest("post", `${appSettings.backendUrl}/auth/reset`, body);
export const validatePasswordResetLink = (code) =>
    sendRequest("get", `${appSettings.backendUrl}/auth/reset/validate/${code}`, null);
export const resetPasswordWithCode = (body) =>
    sendRequest("post", `${appSettings.backendUrl}/auth/reset/password`, body);
export const authenticateUser = (body) =>
    sendRequest("post", `${appSettings.backendUrl}/auth/login`, body);
export const getUserById = (id) =>
    sendRequest("get", `${appSettings.backendUrl}/user/${id}`, null);
    export const updateProfile = (user, id) =>
    sendRequest("put", `${appSettings.backendUrl}/user/edit/profile/${id}`, user);
export const deactivateAccount = (id) =>
    sendRequest("get", `${appSettings.backendUrl}/user/account/deactivation/${id}`, null);