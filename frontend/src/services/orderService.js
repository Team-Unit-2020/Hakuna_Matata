import { sendRequest } from "../Api/api";
import { appSettings } from "../appSettings";

export const sendOrder = (data) =>
    sendRequest("post", `${appSettings.backendUrl}/order/send`, data);

export const getOrdersByUser = (userId) =>
    sendRequest("get", `${appSettings.backendUrl}/order/byUser/${userId}`, null)

export const getOrderById = (orderId) =>
    sendRequest("get", `${appSettings.backendUrl}/order/byId/${orderId}`, null)