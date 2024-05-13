import { useState, useEffect } from 'react';
import { renameKeysRecursive } from '../utils/utils';

const useOverallStatsFetching = (nickname: string) => {
  const [data, setData] = useState<RenamedPlayerOverallStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const getResponseJson = async (uri: string) => {
    try {
      const responseJson = window.electron.ipcRenderer.nodeFetch(uri);
      return responseJson;
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const getPlayerId = async (nickname: string) => {
    try {
      const json = await getResponseJson(
        `https://www.faceit.com/api/users/v1/nicknames/${nickname}`,
      );
      return json.payload.id;
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const getPlayerOverallStats = async (playerId: string) => {
    try {
      const json = await getResponseJson(
        `https://www.faceit.com/api/stats/v1/stats/users/${playerId}/games/cs2`,
      );
      return json;
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const calculateStats = (rawStats: PlayerOverallStats) => {
    // mapObject
    const renamedKeys = {
      k1: 'averageKills',
      k2: 'averageDeaths',
      k3: 'averageAssists',
      k4: 'averageMVPs',
      k5: 'averageKDRatio',
      k6: 'winRate',
      k7: 'headshotsPerMatch',
      k8: 'averageHeadshotsPercentage',
      k9: 'averageKRRatio',
      k10: 'averageTripleKills',
      k11: 'averageQuadroKills',
      k12: 'averagePentaKills',
      m1: 'matchesAmount',
      m2: 'wins',
      m3: 'kills',
      m4: 'deaths',
      m5: 'assists',
      m6: 'MVPs',
      m7: 'KDRatio',
      m8: 'rounds',
      m9: 'headshots',
      m10: 'tripleKills',
      m11: 'quadroKills',
      m12: 'pentaKills',
      m13: 'totalHeadshotsPercentage',
      m14: 'KRRatio',
      m15: 'totalKDRatio',
      m16: 'totalKRRatio',
      m17: 'totalHeadshotsPercentage',
      m18: 'totalHeadshotsPerMatch',
      s0: 'recentResults',
      s1: 'currentWinStreak',
      s2: 'longestWinStreak',
    };
    const renamedObj: RenamedPlayerOverallStats = renameKeysRecursive(
      rawStats,
      renamedKeys,
    );
    return renamedObj;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const playerId = await getPlayerId(nickname);
        const overallStats: PlayerOverallStats =
          await getPlayerOverallStats(playerId);
        const result = calculateStats(overallStats);

        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchData();
  }, [nickname]);

  return { data, isLoading, error };
};

export default useOverallStatsFetching;
