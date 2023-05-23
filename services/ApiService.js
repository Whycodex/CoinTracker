class ApiService {
  static async fetchCoinData() {
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
      const data = await response.json();
      const coinData = data.map((item) => ({
        symbol: item.symbol,
        price: item.lastPrice,
        volume: item.volume,
        percent: item.priceChangePercent
      }));
      return coinData;
    } catch (error) {
      console.log('Error fetching coin data:', error);
      throw error;
    }
  }
}

export default ApiService;
