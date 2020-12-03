import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = () => {
  const { state } = useContext(TrackContext);
  const route = useRoute();
  const _id = route.params._id;

  const track = state.find((track) => track._id === _id);

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        initialRegion={{
          ...track.locations[0].coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default TrackDetailScreen;
