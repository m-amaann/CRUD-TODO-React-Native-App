// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';
import AddTaskScreen from '../screens/AddTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
