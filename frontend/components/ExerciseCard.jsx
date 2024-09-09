import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { BenchPress } from "../assets/icons/play.png";
import Logo from "../assets/icons/bbbenchpress.png";

const ExerciseCard = ({ exercise }) => {
  const [show, setShow] = useState(false);

  return (
    <View className=" justify-start items-start flex-1 pt-2">
      <View className="flex-col rounded-2xl  bg-white  w-full">
        <View className="flex-row px-4">
          <View className="flex-col jusify-start items-start pt-2">
            <Text
              className="text-lg font-psemibold items-start jusify-start"
              numberOfLines={1}
            >
              {JSON.parse(exercise).name}
            </Text>
            <Text className="text-xs font-pregular">
              {JSON.parse(exercise).sets.length} sets
            </Text>
          </View>
          <View className="flex-1 items-end justify-center">
            <Image
              source={Logo}
              resizeMode="contain"
              className="w-[60px] h-[60px]"
            />
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
    </View>
  );
};

export default ExerciseCard;
