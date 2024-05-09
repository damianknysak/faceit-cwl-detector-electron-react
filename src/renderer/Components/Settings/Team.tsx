import React, { useContext, useEffect } from 'react';
import TeamMember from './TeamMember';
import { SettingsContext } from '../../App';
import EmptySlot from './EmptySlot';

const Team = () => {
  const { defaultPlayersState } = useContext<any>(SettingsContext);
  const [defaultPlayers, setDefaultPlayers] = defaultPlayersState;
  const removeDefaultPlayer = (nickname: string) => {
    setDefaultPlayers(defaultPlayers.filter((def: string) => def !== nickname));
  };

  const addDefaultPlayer = (nickname: string) => {
    setDefaultPlayers([...defaultPlayers, nickname]);
  };
  const emptySlots = Array.from(
    { length: 5 - defaultPlayers.length },
    (_, index) => index,
  );
  useEffect(() => {
    console.log('Empty slots', emptySlots);
  }, [emptySlots]);
  return (
    <>
      <div className="w-full px-10 mb-5">
        <span className=" font-bold text-lg">team_cwl</span>
      </div>
      <div className="h-72 w-full px-10 flex gap-5">
        {defaultPlayers.map((player: string) => (
          <TeamMember
            removeFunc={removeDefaultPlayer}
            key={player}
            player={player}
          />
        ))}
        {emptySlots.map((slot) => (
          <EmptySlot addFunc={addDefaultPlayer} key={slot} />
        ))}
      </div>
    </>
  );
};

export default Team;
