import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { Link, router, useRouter } from "expo-router";
import { useAppwrite } from "../../../lib/useAppwrite";
import { getAllWorkouts, useUserWorkouts } from "../../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const index = () => {
  const { user } = useGlobalContext();

  const { data, refetch } = useUserWorkouts(user);
  console.log(data[0]);
  console.log(data[0]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [onWorkout, setOnWorkout] = useState(true);
  return (
    <SafeAreaView className="gap-2 flex-col bg-primary h-full">
      <View className="items-center pb-2 justify-center bg-transparent rounded-b-[40px]">
        <Text className="text-xl font-monsterrat font-bold text-slate-200 ">
          pump
        </Text>
      </View>
      <View className="flex-row justify-around">
        <TouchableOpacity
          className={`border-white border-b-2 w-[50%] items-center ${
            !onWorkout ? "opacity-50" : ""
          }`}
          onPress={() => {
            setOnWorkout(true);
          }}
        >
          <Text className="text-lg font-psemibold text-white">Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`border-white border-b-2 w-[50%] items-center ${
            onWorkout ? "opacity-50" : ""
          }`}
          onPress={() => {
            setOnWorkout(false);
          }}
        >
          <Text className="text-lg font-psemibold text-white">Log</Text>
        </TouchableOpacity>
      </View>
      {onWorkout ? (
        <View>
          <View className="items-center pt-3">
            <TouchableOpacity
              onPress={() => router.push("add-workout")}
              className="flex-row justify-between items-center rounded-lg border-black bg-white px-4 h-24 w-[90%]"
            >
              <Text className="text-xl font-psemibold">New Workout</Text>
              <View className="justify-center items-center flex pt-6">
                <Text className="text-6xl font-pregular">+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="items-start px-5 pt-4">
            <Text className="font-psemibold text-lg text-white">
              My Workouts
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View>
            <Text className="text-white">GET PAST WORKOUTS</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.$id}
            renderItem={(item) => (
              <View className="px-2 justify-start items-start flex-1 h-180 pt-4">
                <View className="flex-col items-center justify-between rounded-2xl py-2 bg-slate-200 w-full h-[100px]">
                  <View className="flex-row px-4">
                    <View className="flex-col jusify-center items-start">
                      <Text
                        className="text-lg font-psemibold items-start jusify-start"
                        numberOfLines={1}
                      >
                        {item.item.title}
                      </Text>
                      <Text className="text-xs font-pregular">
                        {item.item.exercises.length} exercises
                      </Text>
                      <Text className="text-xs font-pregular">
                        {item.item.$createdAt}
                      </Text>
                    </View>
                    <View className="flex-1 items-end justify-center">
                      <Text>{item.item.exercises}</Text>
                      <Text>{}</Text>
                    </View>
                  </View>
                  <View className="flex-col w-full px-2"></View>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center">
                <Text className="text-white text-3xl font-pbold">
                  No Workouts
                </Text>
              </View>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default index;
