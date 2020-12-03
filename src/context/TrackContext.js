import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_track": {
      return action.payload;
    }
    default:
      return state;
  }
};

const createTrack = (dispatch) => async (name, locations) => {
  const response = await trackerApi.post("/tracks", { name, locations });
  console.log(`response: ${response.data}`);
};

const fetchTrack = (dispatch) => async () => {
  try {
    const response = await trackerApi.get("/tracks");
    dispatch({ type: "fetch_track", payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { createTrack, fetchTrack },
  []
);
