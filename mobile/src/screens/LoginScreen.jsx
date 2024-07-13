// screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is installed

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // Validate email format
};

const validatePassword = (password) => {
  return password.length >= 6; // Password must be at least 6 characters long
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkIfLoggedIn(); 
  }, []);



  // Check if user is already logged in
  const checkIfLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // User is already logged in, navigate to Home screen
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Failed to fetch user token from AsyncStorage:', error);
    }
  };

  const handleLogin = async () => {
    // Check if both email and password fields are empty
    if (email.trim() === '' && password.trim() === '') {
      Alert.alert('Error', 'Both inputs are empty, please fill them');
      return;
    }

    if (email.trim() === '') {
      Alert.alert('Error', 'Email input is empty, please fill it');
      return;
    }

    if (password.trim() === '') {
      Alert.alert('Error', 'Password input is empty, please fill it');
      return;
    }

    // Validate email and password
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Please enter a valid password.');
      return;
    }

    const user = {
      email,
      password,
    };

    try {
      const response = await fetch('http://192.168.8.159:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user token to AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);
        // Handle successful login
        navigation.replace('Home');
      } else {
        // Handle login error
        Alert.alert('Error', data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle fetch error
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
    }
  };

  return (
    <StyledView className="flex-1 justify-center px-5 bg-blue-200">
      <StyledText className="text-2xl mb-5 text-center text-white">Login</StyledText>

      <StyledTextInput
        className="h-10 border border-gray-300 mb-3 px-3 text-white"
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <StyledTextInput
        className="h-10 border border-gray-300 mb-3 px-3 text-white"
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button className="mb-3" title="Login" onPress={handleLogin} />
      <StyledTouchableOpacity onPress={() => navigation.navigate('Register')}>
        <StyledText className="text-blue-500 mt-4 text-center">Don't have an account? Register</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default LoginScreen;
