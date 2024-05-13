import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchResults from '../Components/Search/SearchResults';

const Search = () => {
  const { username } = useParams();
  const [searchedUser, setSearchedUser] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const [finalUser, setFinalUser] = useState('');
  useEffect(() => {
    if (username && username != 'default-empty-state') {
      setSearchedUser(username);
      setSearchActive(true);
      setFinalUser(username);
    }
  }, []);
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && searchedUser) {
      setSearchActive(true);
      setFinalUser(searchedUser);
    }
  };
  return (
    <div className="w-full p-4 overflow-y-scroll">
      <div className="w-96 h-12 m-auto shadow-md shadow-[#1dbac5] rounded-full flex items-center gap-4">
        <MagnifyingGlassIcon className="h-8 text-[#1dbac5] pl-4" />
        <input
          placeholder="Search for a player"
          className="bg-transparent w-full h-full text-lg p-2 focus:outline-none"
          type="text"
          value={searchedUser}
          onChange={(e) => {
            setSearchedUser(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {searchActive && (
        <SearchResults player={finalUser} setSearchActive={setSearchActive} />
      )}
    </div>
  );
};

export default Search;
