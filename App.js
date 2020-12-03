import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TrackStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="TrackDetails" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const { state, localSign } = useContext(AuthContext);
  useEffect(() => {
    localSign();
  }, []);

  if (state.isLoading) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <NavigationContainer>
      {state.token != null ? (
        <>
          <Tab.Navigator initialRouteName="Tracks">
            <Tab.Screen name="Tracks" component={TrackStack} />
            <Tab.Screen name="Create" component={TrackCreateScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
          </Tab.Navigator>
        </>
      ) : (
        <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
