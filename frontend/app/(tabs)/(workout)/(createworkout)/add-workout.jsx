import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { useSearchParams } from "expo-router";

import { exercises } from "/Users/ericxiong/Documents/Projects/pump/frontend/constants/exercises.js";
import { postWorkout } from "../../../../lib/appwrite";
import { useGlobalContext } from "../../../context/GlobalProvider";
let id = 0;
const addWorkout = () => {
  let date = new Date();
  let dateString = date.toDateString();
  const { user } = useGlobalContext();
  const [workoutName, setWorkoutName] = useState("Workout");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [exerciseId, setExerciseId] = useState(0);

  console.log("CHINESE TEST" + selectedExercises);

  const stringifyExercises = () => {
    const stringifiedExercisess = selectedExercises.map((item) => {
      return JSON.stringify(item);
    });
    console.log(selectedExercises);
    return stringifiedExercisess;
  };
  const submit = async () => {
    try {
      await postWorkout(
        {
          title: workoutName,
          exercises: stringifyExercises(selectedExercises),
        },
        user.$id
      );
      console.log("SUCCESSFUL ALBANIAN");
      router.back();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  const addExercise = (exercise) => {
    setSelectedExercises([
      ...selectedExercises,
      { ...exercise, id: exerciseId, sets: 2, reps: [], weight: [] }, // Add unique ID for each instance
    ]);
    handleSetsChange(exerciseId, 3);
    setExerciseId(exerciseId + 1);
    setModalVisible(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  };

  const handleSetsChange = (id, value) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise) => {
        if (exercise.id === id) {
          for (let i = 0; i < value; i++) {
            if (!exercise.weight[i]) {
              exercise.weight[i] = 0;
            }
            if (!exercise.reps[i]) {
              exercise.reps[i] = 0;
            }
          }
          return { ...exercise, sets: value };
        } else {
          return exercise;
        }
      })
    );
  };
  const handleWeightChange = (id, index, value) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id
          ? {
              ...exercise,
              weight: [
                ...exercise.weight.slice(0, index),
                value,
                ...exercise.weight.slice(index + 1),
              ],
            }
          : exercise
      )
    );
  };
  const handleRepChange = (id, index, value) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id
          ? {
              ...exercise,
              reps: [
                ...exercise.reps.slice(0, index),
                value,
                ...exercise.reps.slice(index + 1),
              ],
            }
          : exercise
      )
    );
  };

  const handleSetDelete = (id, index) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise) => {
        if (exercise.id === id) {
          const newReps = exercise.reps.filter((_, i) => i !== index);
          const newWeight = exercise.weight.filter((_, i) => i !== index);
          return {
            ...exercise,
            reps: newReps,
            weight: newWeight,
            sets: exercise.sets - 1,
          };
        }
        return exercise;
      })
    );
  };

  return (
    <SafeAreaView className="gap-1 flex-col bg-primary h-full w-full">
      <View className="items-center pb-2 justify-center bg-transparent rounded-b-[40px] w-full">
        <Text className="text-xl font-monsterrat font-bold text-slate-200 ">
          pump
        </Text>
      </View>
      <View className="flex-row">
        <View className="items-start px-5">
          <TextInput
            placeholder="Enter Workout Name"
            placeholderTextColor={"#d3d3d3"}
            className="text-lg text-white font-psemibold"
            onChangeText={(e) => {
              setWorkoutName(e);
            }}
          />
          <Text className="font-pregular text-sm text-white">{dateString}</Text>
        </View>
        <View className="flex-1 border-2 border-red-500 justify-center items-center pr-5">
          <TouchableOpacity
            onPress={() => {
              submit();
            }}
          >
            <Text className="text-white font-psemibold text-lg">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={selectedExercises}
        keyExtractor={(item) => id++}
        renderItem={({ item }) => (
          <View>
            <View className="items-center pt-3">
              <View className="flex-row items-center rounded-2xl bg-white px-4 h-fit w-[90%]">
                <View className="bg-white rounded-3xl ">
                  <View className="flex-row justify-between">
                    <View className="flex-col justify-center">
                      <Text className="text-black font-psemibold text-lg">
                        {item.name}
                      </Text>
                      <Text className="text-slate-500 font-pregular text-xs">
                        {item.sets} Sets
                      </Text>
                    </View>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      className="w-[60px] h-[60px]"
                      tintColor={"#000000"}
                    ></Image>
                  </View>
                  <View className="flex-col w-full">
                    {Array.from({ length: item.sets }).map((_, index) => (
                      <View
                        key={index}
                        className="flex-row w-full justify-around pt-2"
                      >
                        <TextInput
                          className="text-black border-[1px] border-black rounded-2xl font-plight w-[90px] pl-2 justify-center items-center"
                          placeholder="Reps"
                          value={item.reps[index]}
                          keyboardType="numeric"
                          onChangeText={(value) =>
                            handleRepChange(item.id, index, value)
                          }
                        />
                        <Text>Reps</Text>
                        <TextInput
                          className="text-black border-[1px] border-black rounded-2xl font-plight pl-2 w-[90px] justify-center items-center"
                          placeholder="Weight"
                          value={item.weight[index]}
                          keyboardType="numeric"
                          onChangeText={(value) =>
                            handleWeightChange(item.id, index, value)
                          }
                        />
                        <Text>lbs</Text>
                        <TouchableOpacity
                          onPress={() => handleSetDelete(item.id, index)}
                        >
                          <Text className="text-black font-pregular">x</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(selectedExercises);
                      console.log(item.sets);
                      handleSetsChange(item.id, item.sets + 1);
                    }}
                  >
                    <Text className="text-black">Add Set</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View>
            <View className="items-center pt-3">
              <TouchableOpacity
                onPress={() => {
                  console.log(exercises);
                  setModalVisible(true);
                }}
                className="flex-row justify-between items-center rounded-lg border-black bg-white px-4 h-24 w-[90%]"
              >
                <Text className="text-xl font-psemibold">Add Exercise</Text>
                <View className="justify-center items-center flex pt-6">
                  <Text className="text-6xl font-pregular">+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }
      />

      <View className="justify-end items-end w-full">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          className="w-full"
        >
          <View className="w-full flex-1 justify-end items-end bg-transparent">
            <View className="border-2 h-[90%] w-full justify-start items-center flex-col rounded-2xl bg-primary px-4">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                className="justify-start items-start flex-row w-full mb-1"
              >
                <Text className="text-white font-pregular text-sm">Cancel</Text>
              </TouchableOpacity>
              <TextInput
                className="w-full bg-white text-black rounded-2xl h-10 pl-3 mb-1 items-center"
                placeholder="Search exercises..."
                value={searchQuery}
                onChangeText={handleSearch}
                placeholderTextColor={"#808080"}
              />
              <View className="w-full bg-white h-[1px] mt-2"></View>
              <FlatList
                data={filteredExercises}
                keyExtractor={(item) => id++}
                renderItem={({ item }) => (
                  <View className="w-full justify-center">
                    <View className="items-center pt-3 w-full">
                      <TouchableOpacity
                        onPress={() => addExercise(item)}
                        className=""
                      >
                        <View className="flex-row items-center rounded-2xl px-4 bg-white h-24 w-full justify-between">
                          <Text className="text-black text-lg font-psemibold">
                            {item.name}
                          </Text>
                          <Image
                            source={item.image}
                            resizeMode="contain"
                            className="w-[70px] h-[70px]"
                            tintColor={"#000000"}
                          ></Image>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default addWorkout;
