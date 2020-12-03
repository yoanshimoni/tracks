import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { State } from "react-native-gesture-handler";
import Spacer from "./Spacer";

const TrackForm = ({ startRecording, stopRecording, recording, locations }) => {
  const [trackName, setTrackName] = useState("");

  console.log(locations.length);
  return (
    <>
      <Spacer>
        <Input
          value={trackName}
          onChangeText={setTrackName}
          label="Enter track name"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Spacer>
      {!recording ? (
        <Button
          title="Start Recording"
          type="outline"
          onPress={startRecording}
        />
      ) : (
        <Button
          title="Stop"
          type="outline"
          onPress={() => stopRecording(trackName, locations)}
        />
      )}
    </>
  );
};

export default TrackForm;
