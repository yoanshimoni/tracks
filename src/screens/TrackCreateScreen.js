// import "../_testLocation";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { LocationSubscriber } from "expo-location/build/LocationSubscribers";

const TrackCreateScreen = ({ navigation }) => {
  const {
    addLocation,
    startRecording,
    stopRecording,
    state: { locations, recording },
  } = useContext(LocationContext);
  const [isFocus, setIsFocus] = useState(false);

  const callback = useCallback((location) => addLocation(location, recording), [
    recording,
  ]);
  const [err] = useLocation(callback, isFocus || recording);

  useEffect(() => {
    navigation.addListener("focus", () => setIsFocus(true));
    navigation.addListener("blur", () => setIsFocus(false));
  }, []);

  return (
    <SafeAreaView>
      <Map />
      {err ? (
        <Text style={styles.errorText}>Please enable location services</Text>
      ) : null}
      <TrackForm />
      <Text h3>{locations.length}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 20,
    color: "red",
  },
});

export default TrackCreateScreen;
