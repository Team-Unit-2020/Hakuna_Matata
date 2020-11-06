import { SET_USER } from './userTypes'

const initialState = {
    id: "",
    name: "",
    email: "",
    nic: "",
    phone: "",
    address: "",
    dob: "",
    active: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state
    }
}

export default userReducer;