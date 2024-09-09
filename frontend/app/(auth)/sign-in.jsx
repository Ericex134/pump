import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import Logo from "../../assets/icons/logo.png";
import { Image } from "react-native";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const submit = async () => {
    console.log(form);

    if (!form.email || !form.password) {
      Alert.alert("Error", "Please Fill All Fields");
    }

    setSubmitting(true);

    try {
      const result = await signIn(form.email, form.password);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
      console.log("Signed in after button press");
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex-col pt-16 px-4">
          <View className="justify-center items-center">
            <Image
              source={Logo}
              resizeMode="contain"
              className="w-[300px] h-[300px]"
            ></Image>
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles={"mt-7 pt-4"}
            keyboardType="email-address"
            placeholder="Enter Email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles={"mt-5"}
            keyboardType="email-address"
            placeholder="Enter Password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={"w-full mt-7"}
            isLoading={submitting}
          />
        </View>
        <View className="justify-center flex-row gap-1 pt-4">
          <Text className="text-white font-psemibold">
            Don't have an account?
          </Text>
          <Link href="sign-up" className="text-secondary font-psemibold">
            Sign Up
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
