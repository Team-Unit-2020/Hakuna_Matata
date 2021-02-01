import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"

export const AddPost = (body) =>
    sendRequest("post", `${appSettings.backendUrl}/service-provider/advertisement/new`, body);