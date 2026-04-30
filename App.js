import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/routes/RootNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar barStyle="dark-content" />
    </SafeAreaProvider>
  );
}
