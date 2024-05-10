type PlayerMatchStats = {
  kills: Number;
  assists: Number;
  deads: Number;
  threeK: Number;
  fourK: Number;
  fiveK: Number;
  kdRatio: string;
  hsPercentage: Number;
};

type MapStats = {
  [mapName: string]: {
    [key: string]: string;
    k1: string;
    k2: string;
    k3: string;
    k4: string;
    k5: string;
    k6: string;
    k7: string;
    k8: string;
    k9: string;
    k10: string;
    k11: string;
    k12: string;
    m1: string;
    m2: string;
    m3: string;
    m4: string;
    m5: string;
    m6: string;
    m7: string;
    m8: string;
    m9: string;
    m10: string;
    m11: string;
    m12: string;
    m13: string;
    m14: string;
  };
};

type PlayerOverallStats = {
  lifetime: {
    m1: string;
    m2: string;
    m7: string;
    m13: string;
    k5: string;
    k6: string;
    k8: string;
    s0: string[];
    s2: string;
  };
  segments: [
    {
      segments: {
        'f4148ddd-bce8-41b8-9131-ee83afcdd6dd': {
          k1: string;
          k10: string;
          k11: string;
          k12: string;
          k2: string;
          k3: string;
          k4: string;
          k5: string;
          k6: string;
          k7: string;
          k8: string;
          k9: string;
          m1: string;
          m10: string;
          m11: string;
          m12: string;
          m13: string;
          m14: string;
          m2: string;
          m3: string;
          m4: string;
          m5: string;
          m6: string;
          m7: string;
          m8: string;
          m9: string;
        };
      };
    },
    {
      segments: MapStats;
    },
  ];
};

type RenamedMapStats = {
  [mapName: string]: {
    [key: string]: string;
    averageKills: string;
    averageDeaths: string;
    averageAssists: string;
    averageMVPs: string;
    averageKDRatio: string;
    winRate: string;
    headshotsPerMatch: string;
    averageHeadshotsPercentage: string;
    averageKRRatio: string;
    averageTripleKills: string;
    averageQuadroKills: string;
    averagePentaKills: string;
    matchesAmount: string;
    wins: string;
    kills: string;
    deaths: string;
    assists: string;
    MVPs: string;
    KDRatio: string;
    rounds: string;
    headshots: string;
    tripleKills: string;
    quadroKills: string;
    pentaKills: string;
    totalHeadshotsPercentage: string;
    KRRatio: string;
  };
};

type RenamedPlayerOverallStats = {
  lifetime: {
    matchesAmount: string;
    wins: string;
    KDRatio: string;
    totalHeadshotsPercentage: string;
    averageKDRatio: string;
    winRate: string;
    averageHeadshotsPercentage: string;
    recentResults: string[];
    longestWinStreak: string;
  };
  segments: [
    {
      segments: {
        'f4148ddd-bce8-41b8-9131-ee83afcdd6dd': {
          averageKills: string;
          averageTripleKills: string;
          averageQuadroKills: string;
          averagePentaKills: string;
          averageDeaths: string;
          averageAssists: string;
          averageMVPs: string;
          averageKDRatio: string;
          averageHeadshotsPercentage: string;
          winRate: string;
          headshotsPerMatch: string;
          averageKRRatio: string;
          matchesAmount: string;
          wins: string;
          kills: string;
          deaths: string;
          assists: string;
          MVPs: string;
          KDRatio: string;
          rounds: string;
          headshots: string;
          tripleKills: string;
          quadroKills: string;
          pentaKills: string;
          totalHeadshotsPercentage: string;
          KRRatio: string;
        };
      };
    },
    {
      segments: RenamedMapStats;
    },
  ];
};
