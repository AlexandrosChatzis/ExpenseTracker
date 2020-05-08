import { REGISTER, LOGIN, ERRORS, FORGOT } from "./types";
import axios from "axios";

export const forgot = user => dispatch => {
  axios
    .post("/forgot", {
      email: user.email,
      password: user.password,
      password2: user.password2
    })
    .then(res => {
      if (res.data.message === "updated") {
        dispatch({
          type: FORGOT,
          payload: res.data
        });
      } else {
        dispatch({
          type: ERRORS,
          payload: res.data
        });
      }
    });
};
export const register = newuser => dispatch => {
  axios
    .post("/register", {
      name: newuser.name,
      email: newuser.email,
      password: newuser.password,
      password2: newuser.password2
    })
    .then(res => {
      if (res.data._id) {
        dispatch({
          type: REGISTER,
          payload: res.data
        });
      } else {
        dispatch({
          type: ERRORS,
          payload: res.data
        });
      }
    });
};

export const login = user => dispatch => {
  // return { type: LOGIN, payload: user };

  axios
    .post("/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      if (res.data._id) {
        dispatch({
          type: LOGIN,
          payload: res.data
        });
      } else {
        dispatch({
          type: ERRORS,
          payload: res.data
        });
      }
    });
};
