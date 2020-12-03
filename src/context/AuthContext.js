import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error": {
      return { ...state, errorMessage: action.payload };
    }
    case "local_sign": {
      return { token: action.payload, isLoading: false };
    }
    case "signin": {
      return { ...state, token: action.payload, errorMessage: "" };
    }
    case "signout": {
      return { ...state, token: null };
    }
    case "clear_error": {
      return { ...state, errorMessage: "" };
    }
    default:
      return state;
  }
};

const localSign = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "local_sign", payload: token });
    }
  } catch (error) {
    //console.log(error);
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

const signup = (dispatch) => async ({ email, password }) => {
  // make api request to sign up with email and password
  // if succeed we want to modify our state, if error display error message
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
  } catch (error) {
    dispatch({ type: "add_error", payload: "wrong email or password" });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
  } catch (error) {
    dispatch({ type: "add_error", payload: "wrong email or password" });
  }
};

const signout = (dispatch) => async () => {
  AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, localSign },
  { token: null, errorMessage: "", isLoading: true }
);
