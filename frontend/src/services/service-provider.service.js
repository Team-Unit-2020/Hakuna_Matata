import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"

class ServiceProviderService{
    addPost(data){
        return sendRequest("post", `${appSettings.backendUrl}/service-provider/advertisement/new`, data);
    }
    getAllAdvertisements(){
        return sendRequest("get", `${appSettings.backendUrl}/service-provider/advertisement/all`);
    }
    addProfile(data){
        return sendRequest("post",`${appSettings.backendUrl}/service-provider/profile/new`,data);
    }
}
export default new ServiceProviderService();
