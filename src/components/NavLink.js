import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const NavLink = ({ navText, navLink }) => {
  return (
    <TouchableOpacity style={styles.navText} onPress={navLink}>
      <Text style={styles.navText}>{navText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navText: {
    alignSelf: "center",
    fontSize: 20,
  },
});

export default NavLink;
