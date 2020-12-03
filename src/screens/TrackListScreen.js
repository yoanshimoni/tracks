import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { useNavigation } from "@react-navigation/native";

const TrackListScreen = () => {
  const { state, fetchTrack } = useContext(TrackContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", fetchTrack);
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={state}
        keyExtractor={(track) => track._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetails", { _id: item._id })
              }
            >
              <ListItem key={item._id} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
  },
});

export default TrackListScreen;
