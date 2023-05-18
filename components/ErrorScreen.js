import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorScreen = () => {
  return (
    // Replace this screen with any error screen logic
    <View style={styles.container}>
      <Text style={styles.text}>Error occurred while fetching data.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorScreen;
