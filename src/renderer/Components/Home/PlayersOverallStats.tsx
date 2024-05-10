import React, { useContext } from 'react';
import { SettingsContext } from '../../App';
import PlayerOverallStatsCard from './PlayerOverallStatsCard';

const PlayersOverallStats = () => {
  const { defaultPlayersState } = useContext<any>(SettingsContext);
  const [defaultPlayers, setDefaultPlayers] = defaultPlayersState;

  return (
    <div className="w-full flex h-80 justify-around gap-6 px-10 my-6">
      {defaultPlayers.map((player: string) => {
        return <PlayerOverallStatsCard key={player} player={player} />;
      })}
    </div>
  );
};

export default PlayersOverallStats;
