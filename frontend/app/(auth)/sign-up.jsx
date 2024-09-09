import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import Logo from "../../assets/icons/logo.png";
import { Image } from "react-native";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    console.log(form);

    if (
      !form.confirmPassword ||
      !form.username ||
      !form.email ||
      !form.password
    ) {
      Alert.alert("Error", "Please Fill All Fields");
    }

    if (form.confirmPassword !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    }

    setSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
      console.log("User created after button press");
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="flex-row justify-center gap-3 pt-6">
          <View className="justify-end">
            <Text className="text-xl text-slate-200 font-monsterrat font-bold text-center">
              Sign Up for
            </Text>
          </View>
          <View>
            <Image
              source={Logo}
              resizeMode="contain"
              className="w-[120px] h-[120px]"
            />
          </View>
        </View>
        <View className="flex-col px-4">
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => {
              setForm({ ...form, username: e });
            }}
            otherStyles={"mt-7"}
            keyboardType="email-address"
            placeholder="Enter Username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles={"mt-3"}
            keyboardType="email-address"
            placeholder="Enter Email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles={"mt-3"}
            placeholder="Enter Password"
          />
          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => {
              setForm({ ...form, confirmPassword: e });
            }}
            otherStyles={"mt-3"}
            placeholder="Confirm Password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={"w-full mt-7"}
            isLoading={submitting}
          />
        </View>
        <View className="justify-center flex-row gap-1 pt-4">
          <Text className="text-white font-psemibold">
            Already have an account?
          </Text>
          <Link href="sign-in" className="text-secondary font-psemibold">
            Sign In
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
