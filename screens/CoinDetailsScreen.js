import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import CoinChart from '../components/CoinChart';
import { DATA } from '../utils/Data';

const CoinDetailsScreen = ({ route }) => {
  const [coinData, setCoinData] = useState({ labels: [], data: [] });
  const [coinName, setCoinName] = useState('');

  const fetchCoinChartData = async (coin) => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${coin.symbol}&interval=1d&limit=30`  // Fetching details for individual coin for mapping in charts
      );
      const data = await response.json();
      const labels = data.map((item) => new Date(item[0]).toLocaleDateString());
      const prices = data.map((item) => parseFloat(item[4]));
      setCoinData({ labels, data: prices });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const { coin } = route.params;
    setCoinName(coin.symbol);
    fetchCoinChartData(coin);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        // Background image with blur effect
        source={{ uri: DATA[0].image }}
        style={StyleSheet.absoluteFillObject} 
        blurRadius={10}
      /> */}
      <View style={styles.coinContainer}>
        <Image
          source={{ uri: DATA[2].image }}
          style={StyleSheet.absoluteFillObject}
        />
        <Text style={styles.coinName}>{coinName}</Text>
      </View>
      {coinData.labels.length > 0 ? (
        <CoinChart coinData={coinData} />
      ) : (
        <View style={{ margin: 20 }}>
          <ActivityIndicator color="white" />
        </View>
      )}
      <View style={styles.coinDetailsContainer}>
        <Text style={styles.coinDetailsText}>Coin Details Visualization Graph</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'play',
    color: 'white',
    marginTop: 30,
  },
  coinContainer: {
    height: 100,
    padding: 12,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 70
  },
  coinName: {
    fontWeight: '500',
    color: 'black',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    opacity: 0.9,
    fontFamily: 'play'
  },
  coinDetailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40
  },
  coinDetailsText: {
    fontWeight: '500',
    fontFamily: 'play'
  }
});

export default CoinDetailsScreen;
