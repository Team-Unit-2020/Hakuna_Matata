import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"

export const getHomeIcons = () =>
    sendRequest("get", `${appSettings.backendUrl}/dynamic`, null);