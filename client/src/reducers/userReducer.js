import { REGISTER, LOGIN, ERRORS, FORGOT } from "../actions/types";

const initialState = {
  errors: [],
  user: [],
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      if (action.payload._id) {
        state.isAuthenticated = true;
        localStorage.setItem("users", action.payload._id);
        window.location.href = "/";
      }
      return { ...state, user: [action.payload] };
    case LOGIN:
      if (action.payload._id) {
        state.isAuthenticated = true;
        localStorage.setItem("users", action.payload._id);
        window.location.href = "/";
      }
      return { ...state, user: [action.payload] };
    case FORGOT:
      return { ...state, user: [action.payload.message] };
    case ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
