import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import SignForm from "../components/SignForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    navigation.addListener("blur", clearErrorMessage);
  }, []);

  return (
    <SafeAreaView>
      <SignForm
        title="Sign In for Tracker"
        submitText={"Sign In"}
        onSubmit={signin}
        errorMessage={state.errorMessage}
      />
      <NavLink
        navText={`Don't have an account?\n Go back to sign up.`}
        navLink={() => navigation.navigate("Signup")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SigninScreen;
