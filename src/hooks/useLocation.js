import React, { useEffect, useState, useContext } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import { Context as LocationContext } from "../context/LocationContext";

export default (callback, shouldTrack) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startLocating = async () => {
      try {
        console.log("startlocating");
        await requestPermissionsAsync();
        console.log("permission succeed");
        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 100000,
            distanceInterval: 1000,
          },
          callback
        );
        subscriber = sub;
        console.log("watch position succeed- subscriber= " + subscriber);
      } catch (err) {
        console.log(`error locating ${err}`);
        setErr(e);
      }
    };

    console.log(`shouldTrack = ${shouldTrack} subscriber=${subscriber}`);
    if (shouldTrack) {
      startLocating();
    } else if (subscriber) {
      console.log("removing subscriber");
      subscriber.remove();
    }
    subscriber = null;
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
