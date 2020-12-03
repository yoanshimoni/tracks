import { LocationSubscriber } from "expo-location/build/LocationSubscribers";
import React, { useEffect, useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const { state } = useContext(LocationContext);

  if (!state.currentLocation) {
    console.log("current was null");
    return <ActivityIndicator size="large" style={{ marginTop: 400 }} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...state.currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        ...state.currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={state.currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={state.locations.map((loc) => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
