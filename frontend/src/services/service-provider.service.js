import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"

class ServiceProviderService{
    addPost(data){
        return sendRequest("post", `${appSettings.backendUrl}/service-provider/advertisement/new`, data);
    }
    getAllAdvertisements(){
        return sendRequest("get", `${appSettings.backendUrl}/service-provider/advertisement/all`);
    }
    updateProfile(id,data){
        return sendRequest("put",`${appSettings.backendUrl}/service-provider/profile/${id}`,data);
    }
}
export default new ServiceProviderService();
