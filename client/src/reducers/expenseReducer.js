import {
  GET_EXPENSES,
  DELETE_EXPENSE,
  ADD_EXPENSE,
  EXPENSES_LOADING,
  UPDATE_EXPENSE
} from "../actions/types";

const initialState = {
  expenses: [],
  loading: false
};
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSES:
      for (let i = 0; i < action.payload.length; i++) {
        let year = action.payload[i].date_created.slice(0, 4);
        let month = action.payload[i].date_created.slice(5, 7);
        let date = action.payload[i].date_created.slice(8, 10);
        let d = new Date();
        d.setFullYear(Number(year));
        d.setMonth(Number(month) - 1);
        d.setDate(Number(date));

        let dayName = days[d.getDay()];

        action.payload[i].date_created = dayName + " " + date;
      }

      return { ...state, expenses: action.payload, loading: false };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(item => item._id !== action.id)
      };
    case ADD_EXPENSE:
      let year = action.payload.date_created.slice(0, 4);
      let month = action.payload.date_created.slice(5, 7);
      let date = action.payload.date_created.slice(8, 10);
      let d = new Date();
      d.setFullYear(Number(year));
      d.setMonth(Number(month) - 1);
      d.setDate(Number(date));
      let dayName = days[d.getDay()];
      action.payload.date_created = dayName + " " + date;
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      };
    case EXPENSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_EXPENSE:
      let foundIndex = state.expenses.findIndex(item => item._id === action.id);
      state.expenses[foundIndex].etiology = action.payload.etiology;
      state.expenses[foundIndex].type = action.payload.type;
      state.expenses[foundIndex].ammount = Number(action.payload.ammount);

      return {
        ...state
      };
    default:
      return state;
  }
};
