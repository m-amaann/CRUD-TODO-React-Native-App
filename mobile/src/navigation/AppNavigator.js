// // navigation/AppNavigator.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { TouchableOpacity, View, StyleSheet } from 'react-native';
// import PlatformSpecificIcon from '../components/headers/PlatformSpecificIcon';

// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import MainTabNavigator from './MainTabNavigator';
// import AddTaskScreen from '../screens/AddTaskScreen';
// import EditTaskScreen from '../screens/EditTaskScreen';
// import EditProfileScreen from '../screens/EditProfileScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';

// import AsyncStorage from '@react-native-async-storage/async-storage';


// const Stack = createStackNavigator();

// const AppNavigator = () => {

//   const [initializing, setInitializing] = useState(true);
//   const [userToken, setUserToken] = useState(null);


//   useEffect(() => {
//     const bootstrapAsync = async () => {
//       let token = null;
//       try {
//         token = await AsyncStorage.getItem('userToken');
//       } catch (e) {
//         console.error('Error retrieving user token from AsyncStorage:', e);
//       }
//       setUserToken(token);
//       setInitializing(false);
//     };

//     bootstrapAsync();
//   }, []);

//   if (initializing) {
//     return null; // Render loading component if initializing
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={userToken ? 'Home' : 'Welcome'}>
//         <Stack.Screen
//           name="Welcome"
//           component={WelcomeScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={({ navigation }) => ({
//             headerLeft: () => (
//               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
//                 <View style={styles.backButton}>
//                   <PlatformSpecificIcon iosName="arrow-back" mdName="arrow-back-outline" size={24} color="white" />
//                 </View>
//               </TouchableOpacity>
//             ),
//             headerStyle: styles.headerStyle,
//             headerTitle: '',
//           })}
//         />
//         <Stack.Screen
//           name="Register"
//           component={RegisterScreen}
//           options={({ navigation }) => ({
//             headerLeft: () => (
//               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
//                 <View style={styles.backButton}>
//                   <PlatformSpecificIcon iosName="chevron-back" mdName="arrow-back-outline" size={22} color="white" />
//                 </View>
//               </TouchableOpacity>
//             ),
//             headerStyle: styles.headerStyle,
//             headerTitle: '',
//           })}
//         />
//         <Stack.Screen
//           name="Home"
//           component={MainTabNavigator}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AddTask"
//           component={AddTaskScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="EditTask"
//           component={EditTaskScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="EditProfile"
//           component={EditProfileScreen}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   headerStyle: {
//     backgroundColor: '#fff',
//     borderBottomLeftRadius: 20, 
//     borderBottomRightRadius: 20, 
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.10,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
//   backButtonContainer: {
//     paddingHorizontal: 10,
//     paddingBottom: 7,
//   },
//   backButton: {
//     backgroundColor: '#128E80',
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20, 
//     paddingHorizontal: 10, 
//     paddingVertical: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default AppNavigator;


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import PlatformSpecificIcon from '../components/headers/PlatformSpecificIcon';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';
import AddTaskScreen from '../screens/AddTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const checkUserLoggedIn = async () => {
    let token = null;
    try {
      token = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.error('Error retrieving user token from AsyncStorage:', e);
    }

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const expiryDate = new Date(decodedToken.exp * 1000);
        const currentDate = new Date();

        if (currentDate < expiryDate) {
          setUserToken(token);
        } else {
          await AsyncStorage.removeItem('userToken');
          setUserToken(null);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
      }
    }

    setInitializing(false);
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  if (initializing) {
    return null; // Render loading component if initializing
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? 'Home' : 'Welcome'}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <View style={styles.backButton}>
                  <PlatformSpecificIcon iosName="arrow-back" mdName="arrow-back-outline" size={24} color="white" />
                </View>
              </TouchableOpacity>
            ),
            headerStyle: styles.headerStyle,
            headerTitle: '',
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <View style={styles.backButton}>
                  <PlatformSpecificIcon iosName="chevron-back" mdName="arrow-back-outline" size={22} color="white" />
                </View>
              </TouchableOpacity>
            ),
            headerStyle: styles.headerStyle,
            headerTitle: '',
          })}
        />
        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
  backButtonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 7,
  },
  backButton: {
    backgroundColor: '#128E80',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
