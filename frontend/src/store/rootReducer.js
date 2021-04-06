import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import userReducer from "./user/userReducer";

export default combineReducers({
  form: reduxFormReducer,
  user: userReducer,
});
