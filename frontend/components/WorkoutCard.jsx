import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { convertTo12Hour } from "../lib/helper";

const WorkoutCard = ({ post }) => {
  return (
    <View className="px-2 justify-start items-start flex-1 h-180 pt-4">
      <View className="flex-col items-center justify-between rounded-2xl py-2 bg-slate-200 w-full h-[100px]">
        <View className="flex-row px-4">
          <View className="flex-col jusify-center items-start">
            <Text
              className="text-lg font-psemibold items-start jusify-start"
              numberOfLines={1}
            >
              {post.workouts.title}
            </Text>
            <Text className="text-xs font-pregular">
              {post.workouts.exercises.length} exercises
            </Text>
          </View>
          <View className="flex-1 items-end justify-center">
            <Text>{post.$createdAt.split("T")[0]}</Text>
            <Text>{convertTo12Hour(post.$createdAt)}</Text>
          </View>
        </View>
        <View className="flex-col w-full px-2"></View>
      </View>
    </View>
  );
};

export default WorkoutCard;
