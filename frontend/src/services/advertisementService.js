import { sendRequest } from "../Api/api"
import { appSettings } from "../appSettings"

export const getAllAdvertisements = () =>
    sendRequest("get", `${appSettings.backendUrl}/service-provider/services/all`, null)

export const getAdvertisementbyId = (id) =>
    sendRequest("get", `${appSettings.backendUrl}/service-provider/services/id/${id}`, null)

export const getAdvertisementbyPlace = (place) =>
    sendRequest("get", `${appSettings.backendUrl}/service-provider/services/search/byLocation/${place}`, null)

export const getAdvertisementbyCategory = (category, location) =>
    sendRequest("get", `${appSettings.backendUrl}/service-provider/services/search/byCategoryAndLocation/${category}/${location}`, null)

export const addAdvertisementToFavourites = (userId, adId) =>
    sendRequest("get", `${appSettings.backendUrl}/service-provider/services/add/favourites/user/${userId}/ad/${adId}`, null);