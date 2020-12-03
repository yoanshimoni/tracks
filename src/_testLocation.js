import * as Location from "expo-location";

const TEN_METERS_APPROX = 0.0001;

const getLocation = (increment) => {
  console.log("test locating");
  return {
    timeStamp: 10000000,
    coords: {
      latitude: 32.06811050290683 + increment * TEN_METERS_APPROX,
      longitude: 34.78565575403787 + increment * TEN_METERS_APPROX,
      altitudeAccuracy: 5,
      altitude: 5,
      accuracy: 5,
      heading: 0,
      speed: 0,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 8000);
