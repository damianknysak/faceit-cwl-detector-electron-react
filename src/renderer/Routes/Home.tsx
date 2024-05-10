import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../App';
import useMultipleStatsLoad from '../hooks/useMultipleStatsLoad';
import PieChartExample from '../Components/Home/EChartsExample';
import LineChart from '../Components/Home/LineChart';
import { GridLoader } from 'react-spinners';
import PlayersOverallStats from '../Components/Home/PlayersOverallStats';

const Home = () => {
  const { defaultPlayersState } = useContext<any>(SettingsContext);
  const [defaultPlayers, setDefaultPlayers] = defaultPlayersState;

  const [matchesToCompare, setMatchesToCompare] = useState(10);
  const [matchesToCompareTmp, setMatchesToCompareTmp] = useState(10);
  const { data, error, isLoading } = useMultipleStatsLoad(
    defaultPlayers,
    matchesToCompare,
  );
  const [lineDataSource, setLineDataSource] = useState('kdRatio');
  const [pieDataSource, setPieDataSource] = useState('kills');
  const [pie2DataSource, setPie2DataSource] = useState('hsPercentage');

  useEffect(() => {
    console.log('isLoading', isLoading);
    if (data) {
      console.log('DATA LOADED', data);
    }
  }, [data, isLoading, error]);

  return (
    <div className="w-full overflow-y-scroll">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full px-10 mt-4">
          <span className="text-3xl">General Stats</span>
        </div>
        <PlayersOverallStats />

        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center mt-20 pb-40">
            <GridLoader
              color="#1dbac5"
              loading={isLoading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {data && (
              <>
                <div className="w-full px-10 mt-2">
                  <span className="text-3xl">Stats for last matches</span>
                </div>
                <div className="w-full px-10 mt-2 mb-4 flex gap-2 items-center">
                  <span>Set amount of matches to be compared</span>
                  <input
                    className="bg-black w-16 p-2 border border-[#1dbac5]"
                    type="number"
                    value={matchesToCompareTmp}
                    onChange={(e) =>
                      setMatchesToCompareTmp(Number(e.target.value))
                    }
                  />
                  <button
                    className="p-2 bg-black/50 rounded-full border border-[#1dbac5]"
                    onClick={() => {
                      setMatchesToCompare(matchesToCompareTmp);
                    }}
                  >
                    Apply changes
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex flex-col justify-center items-center">
                      <span>Select DataSource for pie chart </span>
                      <select
                        className="bg-black focus:outline-none"
                        defaultValue={'kills'}
                        onChange={(e) => {
                          setPieDataSource(e.target.value);
                        }}
                      >
                        <option value="kills">Kills</option>
                        <option value="assists">Assists</option>
                        <option value="deads">Deaths</option>
                        <option value="threeK">Three Kills</option>
                        <option value="fourK">Four Kills</option>
                        <option value="fiveK">Five Kills</option>
                        <option value="kdRatio">K/D Ratio</option>
                        <option value="hsPercentage">
                          Headshot Percentage
                        </option>
                      </select>
                    </div>
                    <PieChartExample
                      id="pie-1"
                      dataSource={pieDataSource}
                      data={data}
                    />
                  </div>
                  <div>
                    <div className="flex flex-col justify-center items-center">
                      <span>Select DataSource for pie chart 2 </span>
                      <select
                        className="bg-black focus:outline-none"
                        defaultValue={'hsPercentage'}
                        onChange={(e) => {
                          setPie2DataSource(e.target.value);
                        }}
                      >
                        <option value="kills">Kills</option>
                        <option value="assists">Assists</option>
                        <option value="deads">Deaths</option>
                        <option value="threeK">Three Kills</option>
                        <option value="fourK">Four Kills</option>
                        <option value="fiveK">Five Kills</option>
                        <option value="kdRatio">K/D Ratio</option>
                        <option value="hsPercentage">
                          Headshot Percentage
                        </option>
                      </select>
                    </div>
                    <PieChartExample
                      id="pie-2"
                      dataSource={pie2DataSource}
                      data={data}
                    />
                  </div>
                </div>
              </>
            )}
            {data && (
              <>
                <div>
                  <span>Select DataSource for line chart </span>
                  <select
                    className="bg-black focus:outline-none"
                    defaultValue={'kdRatio'}
                    onChange={(e) => {
                      setLineDataSource(e.target.value);
                    }}
                  >
                    <option value="kills">Kills</option>
                    <option value="assists">Assists</option>
                    <option value="deads">Deaths</option>
                    <option value="threeK">Three Kills</option>
                    <option value="fourK">Four Kills</option>
                    <option value="fiveK">Five Kills</option>
                    <option value="kdRatio">K/D Ratio</option>
                    <option value="hsPercentage">Headshot Percentage</option>
                  </select>
                </div>
                <LineChart dataSource={lineDataSource} data={data} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
