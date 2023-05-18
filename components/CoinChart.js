import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

const CoinChart = ({ coinData }) => {
  const chartData = {
    labels: coinData.labels,
    datasets: [
      {
        data: coinData.data,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    barPercentage: 0.5,
    decimalPlaces: 5,
    formatYLabel: (value) => `${value}$`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 20}
          height={200}
          chartConfig={chartConfig}
          style={styles.chart}
          withInnerLines={false}
          withVerticalLabels={false}
        />
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 20}
          height={220}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          withHorizontalLines={false}
          withVerticalLines={false}
          withVerticalLabels={false}
          bezier
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  chart: {
    marginVertical: 10,
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: 12,
    width: '90%',
    margin: 8,
    borderRadius: 16,
    borderWidth: 2,
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 3,
    shadowRadius: 4,
    elevation: 4
  }
});

export default CoinChart;
