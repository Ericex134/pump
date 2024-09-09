import { View, Text } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="add-workout" options={{ headerShown: false }} />
        <Stack.Screen name="workoutScreen" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default _layout;
