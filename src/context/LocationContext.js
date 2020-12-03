import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "start_recording": {
      return { ...state, recording: true };
    }
    case "stop_recording": {
      return { ...state, recording: false };
    }
    case "add_current_location": {
      return { ...state, currentLocation: action.payload };
    }
    case "add_location": {
      return { ...state, locations: [...state.locations, action.payload] };
    }
    default:
      return state;
  }
};

const startRecording = (dispatch) => () => {
  dispatch({ type: "start_recording" });
};

const stopRecording = (dispatch) => async (name, locations) => {
  dispatch({ type: "stop_recording" });
  // save track name through api
  if (locations.length) {
    const responst = await trackerApi.post("/tracks", { name, locations });
    console.log(response);
  }
};

const addLocation = (dispatch) => (location, recording) => {
  // console.log("add location");
  dispatch({ type: "add_current_location", payload: location });
  if (recording) {
    dispatch({ type: "add_location", payload: location });
  }
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation },
  {
    currentLocation: null,
    locations: [],
    recording: false,
  }
);
