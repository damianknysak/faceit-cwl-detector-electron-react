import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChart: React.FC<{
  data: { [x: string]: PlayerMatchStats }[];
  dataSource: string;
}> = ({ data, dataSource }) => {
  useEffect(() => {
    const chartContainer = document.getElementById('line-chart-container');

    const myChart = echarts.init(chartContainer);

    const chartData = data.map((el) => {
      const key = Object.keys(el)[0];
      const value: any = el[key];
      return { value: Number(value[dataSource]), name: key };
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      series: [
        {
          data: chartData,
          type: 'bar',
          itemStyle: {
            color: function (params: any) {
              return colors[params.dataIndex];
            },
          },
        },
      ],
    };
    myChart.setOption(options);

    return () => {
      myChart.dispose();
    };
  }, [dataSource, data]);

  return (
    <>
      <div
        id="line-chart-container"
        style={{ width: '100%', height: '300px' }}
      />
    </>
  );
};

export default LineChart;
