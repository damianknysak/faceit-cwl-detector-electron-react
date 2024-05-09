import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../App';
import useMultipleStatsLoad from '../hooks/useMultipleStatsLoad';
import PieChartExample from '../Components/Home/EChartsExample';
import LineChart from '../Components/Home/LineChart';

const Home = () => {
  const { defaultPlayersState } = useContext<any>(SettingsContext);
  const [defaultPlayers, setDefaultPlayers] = defaultPlayersState;

  const { data, error, isLoading } = useMultipleStatsLoad(defaultPlayers, 10);
  const [teamStats, setTeamStats] = useState<any>();

  useEffect(() => {
    if (data) {
      console.log('DATA LOADED', data);
    }
  }, [data, isLoading, error]);

  return (
    <div className="w-full">
      <div>
        {data && <PieChartExample data={data} />}
        {data && <LineChart data={data} />}
      </div>
    </div>
  );
};

export default Home;
