import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PerformanceMonitor from 'react-native-performance';

export const LoadMonitor = () => {
  const [cpuLoad, setCpuLoad] = useState(0);
  const [isBottleneck, setIsBottleneck] = useState(false);

  useEffect(() => {
    const updateCpuLoad = () => {
      const currentCpuLoad = PerformanceMonitor.getLoad();
      setCpuLoad(currentCpuLoad);
      
      // Check if CPU load exceeds a certain threshold to indicate a potential bottleneck
      const isPotentialBottleneck = currentCpuLoad > 80; // Adjust the threshold as needed
      setIsBottleneck(isPotentialBottleneck);
      
      // Additional logic to handle the bottleneck and optimize performance
      if (isPotentialBottleneck) {
        // Perform actions to optimize performance, such as reducing heavy computations, optimizing rendering, etc.
      }
    };

    const interval = setInterval(updateCpuLoad, 1000); // Update CPU load every second

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.overlay, isBottleneck && styles.bottleneckOverlay]}>
        <Text style={styles.cpuLoadText}>CPU Load: {cpuLoad}%</Text>
        {isBottleneck && <Text style={styles.bottleneckText}>Potential Bottleneck Detected</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  cpuLoadText: {
    color: 'white',
    fontSize: 16,
  },
  bottleneckOverlay: {
    backgroundColor: 'red',
  },
  bottleneckText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});
