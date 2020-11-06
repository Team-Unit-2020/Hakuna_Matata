import { sendRequest } from '../../Api/api';
import { appSettings } from '../../appSettings';
import { SET_USER } from './userTypes';

export const setUserFromId = (userId) => dispatch => {

    sendRequest("get", `${appSettings.backendUrl}/user/${userId}`)
        .then(user => dispatch({
            type: SET_USER,
            payload: user
        }))

}