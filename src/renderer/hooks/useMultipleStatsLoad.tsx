import { useState, useEffect } from 'react';

const useMultipleStatsLoad = (
  nicknames: string[],
  matches_to_compare: Number,
) => {
  const [data, setData] = useState<
    | {
        [x: string]: PlayerMatchStats;
      }[]
    | null
  >(null);
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
    const json = await getResponseJson(
      `https://www.faceit.com/api/users/v1/nicknames/${nickname}`,
    );
    return json.payload.id;
  };

  const getPlayerGames = async (playerId: string) => {
    const json = await getResponseJson(
      `https://www.faceit.com/api/stats/v1/stats/time/users/${playerId}/games/cs2?page=0&size=${matches_to_compare}`,
    );
    return json;
  };

  const calculateStats = (gamesArray: []) => {
    if (gamesArray.length === 0) return;
    const keysToSum = ['i6', 'i7', 'i8', 'i14', 'i15', 'i16', 'c4'];
    const statsObj = gamesArray.reduce((accumulator: any, current) => {
      keysToSum.forEach((key: string) => {
        accumulator[key] =
          (accumulator[key] || 0) + parseFloat(current[key] || 0);
      });
      return accumulator;
    }, {});

    statsObj.c2 = (statsObj.i6 / statsObj.i8).toFixed(2);
    statsObj.c4 = statsObj.c4 / gamesArray.length;

    const resultsObj: any = {};
    const keysPrintName: any = {
      i6: 'kills',
      i7: 'assists',
      i8: 'deads',
      i14: 'threeK',
      i15: 'fourK',
      i16: 'fiveK',
      c2: 'kdRatio',
      c4: 'hsPercentage',
    };
    for (const [key, val] of Object.entries(statsObj))
      resultsObj[keysPrintName[key]] = val;

    return resultsObj;
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const resultsArray: {
        [x: string]: PlayerMatchStats;
      }[] = [];

      for (const nickname of nicknames) {
        const id = await getPlayerId(nickname);
        const playerGames = await getPlayerGames(id);
        const stats = calculateStats(playerGames);
        resultsArray.push({ [nickname]: stats });
      }
      setData(resultsArray);
    };

    fetchData();
    setIsLoading(false);
  }, [nicknames, matches_to_compare]);

  return { data, isLoading, error };
};

export default useMultipleStatsLoad;
