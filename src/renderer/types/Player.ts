type Player = {
  id: string;
  nickname: string;
  created_at: string;
  avatar: string;
  friends: string[];
  games: {
    cs2: {
      faceit_elo: Number;
      skill_level: Number;
    };
  };
};
