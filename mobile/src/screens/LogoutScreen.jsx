// screens/LogoutScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    // Perform any logout operations here (e.g., clearing tokens, etc.)
    setTimeout(() => {
      navigation.replace('Login');
    }, 1000); // Simulate a logout delay
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Logging out...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LogoutScreen;
