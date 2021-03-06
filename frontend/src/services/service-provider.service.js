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

    updateProfile(data){
        return sendRequest("post",`${appSettings.backendUrl}/service-provider/profiless/update`,data);
    }

    checkProfile(id){
        return sendRequest("get",`${appSettings.backendUrl}/service-provider/profile/?id = ${id}`);
    }
}
export default new ServiceProviderService();
