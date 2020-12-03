import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import SignForm from "../components/SignForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    navigation.addListener("blur", clearErrorMessage);
  }, []);

  return (
    <SafeAreaView>
      <SignForm
        title="Sign Up for Tracker"
        submitText="Sign Up"
        onSubmit={signup}
        errorMessage={state.errorMessage}
      />
      <NavLink
        navText={`Already have an account?\n Sign in instead.`}
        navLink={() => navigation.navigate("Signin")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SignupScreen;
