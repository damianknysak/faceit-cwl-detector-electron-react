import React from 'react';
import useDataFetching from '../../hooks/useDataFetching';
import useOverallStatsFetching from '../../hooks/useOverallStatsFetching';
import { UserIcon } from '@heroicons/react/24/outline';
import { HashLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

const PlayerOverallStatsCard: React.FC<{
  player: string;
}> = ({ player }) => {
  const { data, error, isLoading } = useOverallStatsFetching(player);
  return (
    <div className="flex-1 h-full p-2 bg-black/30 rounded-lg border border-gray-600">
      <Link
        to={`search/${player}`}
        className="p-2 flex flex-col flex-1 h-full bg-black/25 rounded-lg transition-all cursor-pointer hover:bg-[#1dbac5]/10"
      >
        <div className="flex justify-between">
          <span>{player}</span>
          <UserIcon className="w-8 h-8 bg-black/50 p-1 rounded-full text-orange-500" />
        </div>
        {/* stats area */}
        <div className="w-full h-full flex flex-col">
          {isLoading ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <HashLoader
                color="#1dbac5"
                loading={isLoading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="mt-2">
              <div className="w-full flex justify-between border-b border-gray-500">
                <span>K/D</span>
                <span className="text-orange-500">
                  {data?.lifetime.averageKDRatio}
                </span>
              </div>
              <div className="w-full flex justify-between border-b border-gray-500">
                <span>HS %</span>
                <span className="text-orange-500">
                  {data?.lifetime.averageHeadshotsPercentage}
                </span>
              </div>
              <div className="w-full flex justify-between border-b border-gray-500">
                <span>Win %</span>
                <span className="text-orange-500">
                  {data?.lifetime.winRate}
                </span>
              </div>
              <div className="w-full flex justify-between border-b border-gray-500">
                <span>Matches</span>
                <span className="text-orange-500">
                  {data?.lifetime.matchesAmount}
                </span>
              </div>
              <div className="w-full flex justify-between border-b border-gray-500">
                <span>Recent</span>
                <span className="text-orange-500">
                  {data?.lifetime.recentResults.map((res) => {
                    const textStyle =
                      res === '0' ? 'text-red-500' : 'text-green-500';
                    return (
                      <span
                        key={Math.random().toString()}
                        className={textStyle}
                      >
                        {res === '0' ? 'L' : 'W'}{' '}
                      </span>
                    );
                  })}
                </span>
              </div>
              <div className="w-full flex justify-center items-center mt-10">
                <span className="text-sm text-gray-500/50">
                  Click here to show more
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PlayerOverallStatsCard;
