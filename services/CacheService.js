import AsyncStorage from '@react-native-async-storage/async-storage';

class CacheService {
  static cacheKey = 'coinData';

  static getCoinData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CacheService.cacheKey);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.log('Error retrieving cached coin data:', error);
      return null;
    }
  };

  static cacheCoinData = async (data) => {
    try {
      await AsyncStorage.setItem(CacheService.cacheKey, JSON.stringify(data));
    } catch (error) {
      console.log('Error caching coin data:', error);
    }
  };
}

export default CacheService;
