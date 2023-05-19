import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CPUProfiler } from 'react-native-performance';

const PerformanceMonitor = () => {
  // Used various solutions provided by chatGPT but couldn't made this work
  const [cpuUsage, setCPUUsage] = useState(0);

  useEffect(() => {
    const profiler = new CPUProfiler();

    const interval = setInterval(() => {
      const usage = profiler.getUsage();
      setCPUUsage(usage);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CPU Usage: {cpuUsage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PerformanceMonitor;
