import * as React from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
} from "react-native";

export default function WelcomeScreen() {
  return (
    <View className="flex flex-col px-5 py-8 mx-auto w-full text-lg leading-6 text-center bg-white font-barlow">
      <Image
        src="/Users/aman/Downloads/assesment-app/mobile/assets/7140416_3487927.jpg"
        alt="alt"
        className="self-center w-auto h-60 aspect-square "
      />
      <View className="self-center mt-8 text-base leading-5 text-gray-500">
        <Text className=" font-barlow text-base text-gray-400">You Can Enter Sign in and Start with notes application.</Text>
      </View>
      <View className="justify-center items-center px-16 py-3 mt-80 font-semibold text-white bg-teal-700 rounded-xl">
        <Text className="font-barlow text-white font-medium">Sign Up</Text>
      </View>
      <View className="justify-center items-center px-16 py-3 mt-4 font-medium rounded-xl bg-gray-200 text-stone-950">
        <Text>Sign In</Text>
      </View>
    </View>
  );
}