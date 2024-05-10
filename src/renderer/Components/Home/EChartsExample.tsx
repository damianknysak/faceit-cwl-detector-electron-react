import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const PieChartExample: React.FC<{
  data: { [x: string]: PlayerMatchStats }[];
  dataSource: string;
  id: string;
}> = ({ data, dataSource, id }) => {
  useEffect(() => {
    const chartContainer = document.getElementById(`pie-chart-${id}`);

    const myChart = echarts.init(chartContainer);

    const chartData = data.map((el) => {
      const key = Object.keys(el)[0];
      const value: any = el[key];
      return { value: Number(value[dataSource]), name: key };
    });

    const options = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          fontSize: 12,
          color: '#1dbac5',
        },
      },
      series: [
        {
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

    myChart.setOption(options);

    return () => {
      myChart.dispose();
    };
  }, [data, dataSource]);

  return (
    <div id={`pie-chart-${id}`} style={{ width: '500px', height: '400px' }} />
  );
};

export default PieChartExample;
