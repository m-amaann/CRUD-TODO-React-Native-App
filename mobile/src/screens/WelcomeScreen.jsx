import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="bg-green-300 flex-1">
      <Text className=" font-barlow text-base text-gray-400">welcome</Text>
    </SafeAreaView>
  )
}