import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts, Barlow_400Regular } from '@expo-google-fonts/barlow';
import 'nativewind';
import { StatusBar } from "react-native";
import { Provider } from 'react-redux';
import RootStack from './src/navigations/RootStack';


export default function App() {
  let [fontsLoaded] = useFonts({
     normal:Barlow_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Provider>
      <RootStack /> 
      <StatusBar barStyle="default"/>      
    </Provider>
  );
}
