import {
  GET_EXPENSES,
  DELETE_EXPENSE,
  ADD_EXPENSE,
  EXPENSES_LOADING,
  UPDATE_EXPENSE
} from "./types";
import axios from "axios";

//dispatch allows us to make asyc req
export const getExpenses = (month, year) => dispatch => {
  dispatch(setExpensesLoading());
  axios
    .get(`expenses?user_id=${localStorage.users}&month=${month}&year=${year}`)
    .then(res =>
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      })
    );
};
export const deleteExpense = id => dispatch => {
  axios.delete(`expenses/${id}`).then(res =>
    dispatch({
      type: DELETE_EXPENSE,
      payload: res.data,
      id: id
    })
  );
};
export const addExpense = (expense, month, year) => dispatch => {
  axios
    .post("expenses", {
      user_id: localStorage.users,
      etiology: expense.etiology,
      type: expense.type,
      ammount: expense.ammount,
      date: `${year}-${month}`
    })
    .then(res =>
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data
      })
    );
};
export const updateExpense = (expense, id) => dispatch => {
  axios
    .put(`expenses/${id}`, {
      etiology: expense.etiology,
      type: expense.type,
      ammount: Number(expense.ammount)
    })
    .then(res =>
      dispatch({
        type: UPDATE_EXPENSE,
        payload: expense,
        id: id
      })
    );
};
export const setExpensesLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};
