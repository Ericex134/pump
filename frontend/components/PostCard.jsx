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
import ExerciseCard from "./ExerciseCard";
import CustomButton from "./CustomButton";
import WorkoutCard from "./WorkoutCard";

const PostCard = ({ post }) => {
  const [show, setShow] = useState(false);
  return (
    <View
      style={{ height: "fit" }}
      className="mb-10 pt-2 pb-2 bg-black rounded-3xl mx-1"
    >
      <View className="flex-col items-center px-2  ">
        <View className="flex-row gap-3 items-start">
          <View className="justify-center items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-3xl border border-primary justify-center items-center p-0.5">
              <Image
                source={{ uri: post.users.avatar }}
                className="w-full h-full rounded-2xl"
                resizeMode="cover"
              />
            </View>
            <View className="justify-center flex-1 ml-3 gap-y-1">
              <Text className="text-slate-400 text-xs font-pregular">
                {"@" + post.users.username}
              </Text>
              <Text
                className="text-white font-psemibold text-sm"
                numberOfLines={1}
              >
                {post.users.streak} day streak
              </Text>
            </View>
          </View>
        </View>
        {post.photo !== null ? (
          <View className="w-full h-[400px] mb-5">
            <ImageBackground
              source={{ uri: post.photo }}
              className="w-full h-full mt-3 justify-end items-center"
              imageStyle={{ borderRadius: 6 }}
              resizeMode="cover"
            >
              <CustomButton
                title="View Workout"
                handlePress={() => {}}
                containerStyles={"w-40 mb-7 mr-5 bg-white opacity-80"}
                textStyles={"text-lg"}
              />
            </ImageBackground>
          </View>
        ) : (
          <WorkoutCard post={post} />
        )}
      </View>

      {/* <View className="px-2 justify-start items-start flex-1">
        <View
          style={{ height: "fit" }}
          className="flex-col items-center justify-between rounded-2xl py-2 bg-slate-200 w-full"
        >
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
          <View className="flex-col w-full px-2">
            <View className="justify-center items-center">
              <TouchableOpacity
                onPress={() => {
                  setShow(true);
                }}
                className="pt-1"
              >
                {!show && (
                  <Text className="text-xs font-pregular text-slate-500">
                    Show More
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="mt-2 rounded-3xl">
              {show && (
                <FlatList
                  data={post.workouts.exercises}
                  keyExtractor={(item) => item.index}
                  renderItem={({ item }) => <ExerciseCard exercise={item} />}
                />
              )}
            </View>
            <View className="justify-center items-center">
              <TouchableOpacity
                onPress={() => {
                  setShow(false);
                }}
                className="pt-1"
              >
                {show && (
                  <Text className="text-xs font-pregular text-slate-500">
                    Show Less
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </View> */}
      <View className="pt-2 ml-4 mb-4">
        <Text className=" text-white font-sm">{post.workouts.title}</Text>
        <Text className=" text-white font-sm">{post.caption}</Text>
      </View>
    </View>
  );
};

export default PostCard;
