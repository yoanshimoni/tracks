import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { Button } from "react-native-elements";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Button title="Sign Out" type="outline" onPress={signout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
