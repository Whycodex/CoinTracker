import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import {useFonts} from 'expo-font';

export default function App() {
  // Loading custom fonts
  const [loadedFont] = useFonts({play: require('./assets/fonts/Play.ttf')});
  if(!loadedFont) return null;
  
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});