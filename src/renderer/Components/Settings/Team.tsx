import React, { useContext, useEffect } from 'react';
import TeamMember from './TeamMember';
import { SettingsContext } from '../../App';

const Team = () => {
  const [defaultPlayers, setDefaultPlayers] = useContext<any>(SettingsContext);

  const removeDefaultPlayer = (nickname: string) => {
    setDefaultPlayers(defaultPlayers.filter((def: string) => def !== nickname));
  };

  return (
    <>
      <div className="w-full px-10 mb-5">
        <span>team_cwl</span>
      </div>
      <div className="h-72 w-full px-10 flex gap-5">
        {defaultPlayers.map((player: string) => (
          <TeamMember
            removeFunc={removeDefaultPlayer}
            key={player}
            player={player}
          />
        ))}
      </div>
    </>
  );
};

export default Team;
