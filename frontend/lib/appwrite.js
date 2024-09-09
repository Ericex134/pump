import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.pump",
  projectId: "6671474a003a7c39f27a",
  databseId: "667149be001ac7fd54b0",
  userCollectionId: "667149ee0027cd2f6c0c",
  postCollectionId: "66714a0c001cf02218a8",
  workoutCollectionId: "66714b71001f1ad28df3",
  storageId: "66714dc600323492cf77",
};
import { useState, useEffect } from "react";
import { Alert } from "react-native";
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAcc = await account.create(ID.unique(), email, password, username);
    if (!newAcc) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAcc.$id,
        email,
        avatar: avatarUrl,
        username,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAcc = await account.get();
    console.log("Current Session:");
    console.log(currentAcc);
    if (!currentAcc) throw Error;
    const currentUser = await databases.listDocuments(
      config.databseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAcc.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    const result = await account.deleteSession("current");
    console.log(result);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databseId,
      config.postCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getAllWorkouts() {
  try {
    const posts = await databases.listDocuments(
      config.databseId,
      config.workoutCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export function useUserWorkouts(user) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUserWorkoutsHelper(user);
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, refetch };
}

export async function getUserWorkoutsHelper(user) {
  if (!user || !user.$id) {
    throw new Error("Invalid user");
  }

  try {
    const posts = await databases.listDocuments(
      config.databseId,
      config.workoutCollectionId
    );
    console.log(posts.documents);
    let workouts = posts.documents.filter((post) => {
      console.log(post.users);
      console.log("Post User Id");
      console.log(post.users.$id);
      console.log("User Id");
      console.log(user);
      return post.users.$id === user.$id;
    });
    console.log("Workouts with User id");
    console.log(workouts);
    return workouts;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Failed to fetch workouts");
  }
}

export async function getPostsToday() {
  function formatDateInFrankfurt() {
    const date = new Date();
    const options = {
      timeZone: "Europe/Berlin",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const frankfurtDate = date.toLocaleDateString("en-CA", options); // 'en-CA' provides the format yyyy-mm-dd

    return frankfurtDate;
  }

  const formattedDate = formatDateInFrankfurt();
  console.log(formattedDate);

  try {
    const posts = await databases.listDocuments(
      config.databseId,
      config.postCollectionId,
      [Query.startsWith("$createdAt", formattedDate)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function postWorkout(workout, user) {
  try {
    const newWorkout = databases.createDocument(
      config.databseId,
      config.workoutCollectionId,
      ID.unique(),
      {
        title: workout.title,
        exercises: workout.exercises,
        users: user,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
