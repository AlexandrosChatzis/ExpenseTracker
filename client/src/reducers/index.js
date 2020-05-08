import { combineReducers } from "redux";
import userReducer from "./userReducer";
import expenseReducer from "./expenseReducer";
export default combineReducers({
  user: userReducer,
  expense: expenseReducer
});
