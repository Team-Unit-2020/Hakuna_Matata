import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"

class ServiceProviderService{
    addPost(data){
        return sendRequest("post", `${appSettings.backendUrl}/service-provider/advertisement/new`, data);
    }

    updateProfile(id,data){
        sendRequest("put",`${appSettings.backendUrl}/service-provider/profile/${id}`,data);
    }
}
export default new ServiceProviderService();
