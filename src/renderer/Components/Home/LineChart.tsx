import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChart: React.FC<{
  data: { [x: string]: PlayerMatchStats }[];
}> = ({ data }) => {
  useEffect(() => {
    // Pobierz element DOM, do którego chcesz dodać wykres
    const chartContainer = document.getElementById('line-chart-container');

    // Inicjalizuj ECharts
    const myChart = echarts.init(chartContainer);

    const chartData = data.map((el) => {
      let key = Object.keys(el)[0];
      return { value: Number(el[key].kdRatio), name: key };
    });

    const shortenXaxisLabel = (str: string) => {
      if (str.length > 9) {
        return str.substring(0, 9) + '...';
      } else {
        return str;
      }
    };

    const chartXaxis = data.map((el) => shortenXaxisLabel(Object.keys(el)[0]));
    console.log('chartXaxis', chartXaxis);

    const colors = ['#ff9f1c', '#ffbf69', '#ffffff', '#cbf3f0', '#2ec4b6'];
    // Ustaw opcje wykresu
    const options = {
      xAxis: {
        type: 'category',
        data: chartXaxis,
        axisLabel: {
          color: '#1dbac5',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#1dbac5',
        },
      },
      series: [
        {
          data: chartData,
          type: 'bar',
          itemStyle: {
            // Ustawiamy kolor tła słupków jako tablicę kolorów
            color: function (params: any) {
              return colors[params.dataIndex];
            },
          },
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
    <div id="line-chart-container" style={{ width: '100%', height: '300px' }} />
  );
};

export default LineChart;
