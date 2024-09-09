import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native";
import Logo from "../assets/icons/logo.png";
import { Image } from "react-native";
import CustomButton from "../components/CustomButton";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "./context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-col items-center gap-10 mt-20 min-h-[90vh]">
          <Image source={Logo} resizeMode="contain"></Image>
          <View className="">
            <Text className="text-2xl text-slate-200 font-monsterrat font-bold text-center">
              {"Dive into the world of Fitness \n and Self Improvement"}
            </Text>
            <View className="mt-20">
              <CustomButton
                title="Sign In"
                handlePress={() => {
                  router.push("./sign-in");
                }}
                containerStyles={""}
              />
              <CustomButton
                title="Sign Up"
                handlePress={() => {
                  router.push("./sign-up");
                }}
                containerStyles={"mt-5"}
              />
              <CustomButton
                title="teset"
                handlePress={() => {
                  router.push("./home");
                }}
                containerStyles={"mt-5"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161222" style="light" />
    </SafeAreaView>
  );
}
