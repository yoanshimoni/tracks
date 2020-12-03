import React, { useEffect, useState } from "react";
import Spacer from "./Spacer";
import { StyleSheet, Text } from "react-native";
import { Text as TextElement, Input, Button } from "react-native-elements";

const SignForm = ({ title, submitText, onSubmit, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <TextElement h2>{title}</TextElement>
      </Spacer>
      <Spacer />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {errorMessage ? (
        <Spacer>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </Spacer>
      ) : null}
      <Spacer>
        <Button
          title={submitText}
          type="outline"
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
      <Spacer />
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 20,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default SignForm;
