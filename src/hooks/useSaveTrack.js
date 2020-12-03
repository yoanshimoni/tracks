import { LocationSubscriber } from "expo-location/build/LocationSubscribers";
import React, { useEffect, useState, useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    reset,
    state: { locations, name },
  } = useContext(LocationContext);
  const navigation = useNavigation();

  const saveTrack = async () => {
    console.log(name);
    await createTrack(name, locations);
    reset();
    navigation.navigate("Tracks");
  };

  return [saveTrack];
};
