import React, { useEffect, useState } from 'react';
import LineChartMaps from './LineChartMaps';

const MapsCompare: React.FC<{ data: RenamedPlayerOverallStats | null }> = ({
  data,
}) => {
  const [dataSource, setDataSource] = useState('averageKDRatio');
  useEffect(() => {
    // console.log('MAPS COMPARE', keys);
  }, []);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <span>Select DataSource for pie chart </span>
        <select
          className="bg-black focus:outline-none"
          defaultValue={'averageKDRatio'}
          onChange={(e) => {
            setDataSource(e.target.value);
          }}
        >
          <option value="winRate">Win Rate</option>
          <option value="headshotsPerMatch">Headshots Per Match</option>
          <option value="averageHeadshotsPercentage">
            Average Headshots Percentage
          </option>
          <option value="averageKRRatio">Average K/R Ratio</option>
          <option value="averageKDRatio">Average K/D Ratio</option>
          <option value="averageTripleKills">Average Triple Kills</option>
          <option value="averageQuadroKills">Average Quadro Kills</option>
          <option value="averagePentaKills">Average Penta Kills</option>
          <option value="matchesAmount">Matches Amount</option>
          <option value="wins">Wins</option>
          <option value="kills">Kills</option>
          <option value="deaths">Deaths</option>
          <option value="assists">Assists</option>
        </select>
      </div>
      <LineChartMaps dataSource={dataSource} data={data} />
    </div>
  );
};

export default MapsCompare;
