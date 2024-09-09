import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Streaks from "../../components/Streaks";
import { getAllPosts, getPostsToday } from "../../lib/appwrite";
import { useAppwrite } from "../../lib/useAppwrite";
import PostCard from "../../components/PostCard";

const Home = () => {
  const { data, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderItem = (item) => <PostCard post={item.item} />;
  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="items-center pb-2 justify-center bg-transparent rounded-b-[40px]">
        <Text className="text-xl font-monsterrat font-bold text-slate-200 ">
          pump
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View className="bg-primary flex-1 h-full pb-6">
            <Text className="text-xl text-white">Streaks</Text>
            <Streaks users={[{ id: 1 }, { id: 2 }] ?? []} />
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-3xl font-pbold">No Posts</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
