import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const PieChartExample: React.FC<{
  data: { [x: string]: PlayerMatchStats }[];
}> = ({ data }) => {
  useEffect(() => {
    // Pobierz element DOM, do którego chcesz dodać wykres
    const chartContainer = document.getElementById('pie-chart-container');

    // Inicjalizuj ECharts
    const myChart = echarts.init(chartContainer);

    const chartData = data.map((el) => {
      let key = Object.keys(el)[0];
      return { value: el[key].kills, name: key };
    });

    console.log('chartData', chartData);
    // Ustaw opcje wykresu
    const options = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          fontSize: 12, // Rozmiar czcionki
          color: '#1dbac5', // Kolor tekstu
        },
      },
      series: [
        {
          name: 'Kills count',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: chartData,
        },
      ],
    };

    // Ustaw opcje i renderuj wykres
    myChart.setOption(options);

    // Zwróć funkcję czyszczącą wykres
    return () => {
      myChart.dispose();
    };
  }, []); // Użyj pustej tablicy zależności, aby efekt wykonał się tylko raz

  return (
    <div id="pie-chart-container" style={{ width: '500px', height: '400px' }} />
  );
};

export default PieChartExample;
