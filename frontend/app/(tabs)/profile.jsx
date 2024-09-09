import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { logoutUser } from "../../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import { router } from "expo-router";

const Profile = () => {
  const { setIsLoggedIn, setUser, setLoading } = useGlobalContext();
  const logout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    router.push("../sign-in");
  };
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
        className="bg-secondary-100"
      >
        <Text className="text-lg">LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
