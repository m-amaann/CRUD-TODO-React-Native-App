import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/common/InputFields';

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
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Check if both email and password fields are empty
    if (email.trim() === '' && password.trim() === '') {
      setEmailError('Email input is empty, please fill it');
      setPasswordError('Password input is empty, please fill it');
      return;
    }

    // Check if email fields are empty
    if (email.trim() === '') {
      setEmailError('Email input is empty, please fill it');
      return;
    }

    // Check if password fields are empty
    if (password.trim() === '') {
      setPasswordError('Password input is empty, please fill it');
      return;
    }

    // Validate email and password
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Please enter a valid password.');
      return;
    }

    const user = { email, password };

    try {
      setIsLoading(true);
      const response = await fetch('http://192.168.8.159:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);  // Save user token to AsyncStorage
        // Handle successful login
        navigation.replace('Home');
      } else {
        // Handle login error
        Alert.alert('Error', data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle fetch error
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20 }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#374151' }}>Sign In</Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 13, color: '#6B7280' }} className="leading-">You can sign-in into account and enjoy task management with application.</Text>
      </View>
      <View style={{ width: '100%', marginBottom: 20, paddingTop: 20 }}>
        {emailError ? (
          <Text style={{ color: '#EF4444', fontSize: 13, marginBottom: 10 }}>{emailError}</Text>
        ) : null}
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={emailError}
        />
        {passwordError ? (
          <Text style={{ color: '#EF4444', fontSize: 13, marginBottom: 10 }}>{passwordError}</Text>
        ) : null}
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={passwordError}
        />
      </View>
      <TouchableOpacity
        style={{ width: '100%', backgroundColor: '#0F8275', paddingVertical: 11, borderRadius: 12, alignItems: 'center', position: 'absolute', bottom: 50 }}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
