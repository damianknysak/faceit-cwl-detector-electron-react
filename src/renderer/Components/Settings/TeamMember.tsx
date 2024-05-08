import React, { useEffect, useState } from 'react';
import useDataFetching from '../../hooks/useDataFetching';
import { ClipLoader } from 'react-spinners';
import {
  BoltIcon,
  ChartBarIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface TeamMemberProps {
  player: string;
  removeFunc: (nickname: string) => void;
}

const TeamMember: React.FC<TeamMemberProps> = ({ player, removeFunc }) => {
  const { data, isLoading, error } = useDataFetching(
    `https://www.faceit.com/api/users/v1/nicknames/${player}`,
  );
  const [playerProps, setPlayerProps] = useState<Player | null>(null);

  useEffect(() => {
    if (data && !isLoading && !error) {
      setPlayerProps(data.payload);
    }
  }, [data, isLoading, error]);

  return (
    <div className="relative flex-1 rounded-xl shadow-md shadow-[#1dbac5]">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader
            color="#1dbac5"
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center pt-2">
          <div
            onClick={() => {
              removeFunc(player);
            }}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </div>
          <img
            className="rounded-full"
            width={100}
            height={100}
            src={playerProps?.avatar}
            alt=""
          />

          <div className="flex flex-col items-center mt-2 gap-1">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#1dbac5]" />
              <span className="text-[#1dbac5]">{playerProps?.nickname}</span>
            </div>

            <div className="flex items-center gap-2">
              <BoltIcon className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500">
                {playerProps?.games?.cs2?.skill_level.toString()} lvl
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-4 h-4 text-red-200" />
              <span className="text-red-200">
                {playerProps?.games?.cs2?.faceit_elo.toString()} elo
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMember;
