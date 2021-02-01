import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"

export const addPost = (body) =>
    sendRequest("post", `${appSettings.backendUrl}/service-provider/advertisement/new`, body);