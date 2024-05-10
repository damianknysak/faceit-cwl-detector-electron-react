import React, { useEffect, useState } from 'react';
import useOverallStatsFetching from '../../hooks/useOverallStatsFetching';
import { HashLoader } from 'react-spinners';
import useDataFetching from '../../hooks/useDataFetching';
import { BoltIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline';
import MapsCompare from './MapsCompare';

const SearchResults: React.FC<{ player: string }> = ({ player }) => {
  const { data, error, isLoading } = useOverallStatsFetching(player);
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: isProfileError,
  } = useDataFetching(
    `https://www.faceit.com/api/users/v1/nicknames/${player}`,
  );
  const [playerProfile, setPlayerProfile] = useState<Player | null>(null);
  const [overallPlayerStats, setOverallPlayerStats] =
    useState<RenamedPlayerOverallStats | null>(null);
  useEffect(() => {
    if (profileData && !isProfileLoading && !isProfileError) {
      setPlayerProfile(profileData.payload);
    }

    if (data && !isLoading && !error) {
      setOverallPlayerStats(data);
    }
  }, [profileData, isProfileLoading, data, isLoading]);
  return (
    <div className="w-full h-full">
      {isLoading || isProfileLoading ? (
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
        <div className="mt-8">
          <div className="flex w-full">
            <div className="flex flex-col w-[200px]">
              <img
                className="rounded-lg"
                width={200}
                height={200}
                src={playerProfile?.avatar}
                alt=""
              />
              <div className="flex flex-col items-center mt-2">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#1dbac5]" />
                  <span className="text-[#1dbac5]">
                    {playerProfile?.nickname}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <BoltIcon className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-500">
                    {playerProfile?.games?.cs2?.skill_level.toString()} lvl
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="w-4 h-4 text-red-200" />
                  <span className="text-red-200">
                    {playerProfile?.games?.cs2?.faceit_elo.toString()} elo
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mx-6 gap-8">
              <div className="flex-1">
                <span className="text-xl">Life time stats</span>
                <div className="flex flex-col w-96">
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
                </div>
              </div>
              <div className="flex-1">
                <span className="text-xl">Only CS2 stats</span>
                <div className="flex flex-col w-96">
                  <div className="w-full flex justify-between border-b border-gray-500">
                    <span>K/D</span>
                    <span className="text-orange-500">
                      {
                        data?.segments[0].segments[
                          'f4148ddd-bce8-41b8-9131-ee83afcdd6dd'
                        ].averageKDRatio
                      }
                    </span>
                  </div>
                  <div className="w-full flex justify-between border-b border-gray-500">
                    <span>HS %</span>
                    <span className="text-orange-500">
                      {
                        data?.segments[0].segments[
                          'f4148ddd-bce8-41b8-9131-ee83afcdd6dd'
                        ].averageHeadshotsPercentage
                      }
                    </span>
                  </div>
                  <div className="w-full flex justify-between border-b border-gray-500">
                    <span>Win %</span>
                    <span className="text-orange-500">
                      {
                        data?.segments[0].segments[
                          'f4148ddd-bce8-41b8-9131-ee83afcdd6dd'
                        ].winRate
                      }
                    </span>
                  </div>
                  <div className="w-full flex justify-between border-b border-gray-500">
                    <span>Matches</span>
                    <span className="text-orange-500">
                      {
                        data?.segments[0].segments[
                          'f4148ddd-bce8-41b8-9131-ee83afcdd6dd'
                        ].matchesAmount
                      }
                    </span>
                  </div>
                  <div className="w-full flex justify-between border-b border-gray-500">
                    <span>K/R</span>
                    <span className="text-orange-500">
                      {
                        data?.segments[0].segments[
                          'f4148ddd-bce8-41b8-9131-ee83afcdd6dd'
                        ].averageKRRatio
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data && <MapsCompare data={data} />}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
