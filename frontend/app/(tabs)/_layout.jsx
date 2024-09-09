import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect, Stack } from "expo-router";

const TabLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
        <Tabs.Screen name="(workout)" options={{ headerShown: false }} />
        <Tabs.Screen name="community" options={{ headerShown: false }} />
      </Tabs>
    </>
  );
};

export default TabLayout;
