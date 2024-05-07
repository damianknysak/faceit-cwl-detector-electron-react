// import { getStats } from '../../main/main';

const Settings = () => {
  const DEFAULT_PLAYERS = [
    'ANNIHILATI0N',
    'CpereK',
    'vhajdus',
    'ZoQu15',
    'ffomzpom',
  ];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full px-10 mb-5">
        <span>team_cwl</span>
      </div>
      <div className="h-72 w-full px-10 flex gap-5">
        {DEFAULT_PLAYERS.map((player) => (
          <div
            key={player}
            className="flex-1 rounded-xl shadow-md shadow-[#1dbac5]"
          >
            <button onClick={() => {}}>{player}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
