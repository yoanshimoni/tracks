import React, { useState, useContext } from "react";
import { Button, Input } from "react-native-elements";
import { State } from "react-native-gesture-handler";
import Spacer from "./Spacer";
import useSaveTrack from "../hooks/useSaveTrack";
import { Context as LocationContext } from "../context/LocationContext";

const TrackForm = () => {
  const [trackName, setTrackName] = useState("");
  const [saveTrack] = useSaveTrack();
  const {
    startRecording,
    stopRecording,
    changeName,
    state: { recording, locations, name },
  } = useContext(LocationContext);

  console.log(locations.length);
  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          label="Enter track name"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Spacer>
      <Spacer>
        {!recording ? (
          <Button
            title="Start Recording"
            type="outline"
            onPress={startRecording}
          />
        ) : (
          <Button title="Stop" type="outline" onPress={stopRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button title="Save Track" type="outline" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;
