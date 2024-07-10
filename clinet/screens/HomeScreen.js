// screens/HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TaskScreen from "./TaskScreen";

const HomeScreen = ({ navigation }) => {
  return <TaskScreen navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
