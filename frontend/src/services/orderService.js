import { sendRequest } from "../Api/api";
import { appSettings } from "../appSettings";

export const sendOrder = (data) =>
    sendRequest("post", `${appSettings.backendUrl}/order/send`, data)