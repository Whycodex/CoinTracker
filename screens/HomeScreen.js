import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ErrorScreen from '../components/ErrorScreen';
import CoinTable from '../components/CoinTable';
import ApiService from '../services/ApiService';
import CacheService from '../services/CacheService';

const HomeScreen = ({ navigation }) => {
  const [isError, setIsError] = useState(false);
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const fetchCoinData = async () => {
      let data = await CacheService.getCoinData();

      if (data) {
        setCoinData(data);
      } else {
        try {
          data = await ApiService.fetchCoinData(); // Making API calls
          CacheService.cacheCoinData(data);  // Storing in local storage
          setCoinData(data);
        } catch (error) {
          setIsError(true);
        }
      }
    };

    fetchCoinData();
  }, []);

  const handleCoinPress = (coin) => {
    navigation.navigate('CoinDetails', { coin });
  };

  return (
    <View style={styles.container}>
      {isError ? (
        <ErrorScreen />
      ) : (
        <CoinTable data={coinData} onCoinPress={handleCoinPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});

export default HomeScreen;
