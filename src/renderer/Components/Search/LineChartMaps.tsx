import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChartMaps: React.FC<{
  data: RenamedPlayerOverallStats | null;
  dataSource: string;
}> = ({ data, dataSource }) => {
  useEffect(() => {
    const chartContainer = document.getElementById('line-chart-container');

    const myChart = echarts.init(chartContainer);

    const obj: any = data?.segments[1]?.segments;
    const maps = Object.keys(obj);
    const getChartData = () => {
      const resultArr = [];
      for (const map of maps) {
        const mapStats = data?.segments[1].segments[map];
        resultArr.push(mapStats?.[dataSource]);
      }
      return resultArr;
    };

    const shortenXaxisLabel = (str: string) => {
      if (str.length > 9) {
        return str.substring(0, 9) + '...';
      } else {
        return str;
      }
    };

    const getXaxis = () => {
      return maps.map((el) => shortenXaxisLabel(el));
    };

    const colors = [
      '#ff9f1c',
      '#ffbf69',
      '#ffffff',
      '#cbf3f0',
      '#2ec4b6',
      '#7fcd91',
      '#a8d0e6',
      '#d8b8ff',
      '#f7786b',
      '#e71d36',
    ];

    const options = {
      xAxis: {
        type: 'category',
        data: getXaxis(),
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
          data: getChartData(),
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
  }, [data, dataSource]);

  return (
    <>
      <div
        id="line-chart-container"
        style={{ width: '100%', height: '300px' }}
      />
    </>
  );
};
export default LineChartMaps;
