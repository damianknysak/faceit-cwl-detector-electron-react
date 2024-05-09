import { UserPlusIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface EmptySlotProps {
  addFunc: (nickname: string) => void;
}

const EmptySlot: React.FC<EmptySlotProps> = ({ addFunc }) => {
  const [inputMode, setInputMode] = useState(false);
  const [newPlayer, setNewPlayer] = useState<string>('');

  return (
    <div
      onClick={() => {
        setInputMode(true);
      }}
      className="relative flex-1 flex justify-center items-center rounded-xl shadow-md shadow-[#1dbac5] cursor-pointer"
    >
      <div className="flex flex-col items-center">
        {inputMode ? (
          <>
            <input
              className="w-4/5 text-[#1dbac5] bg-transparent border-b-2 border-[#1dbac5] focus:outline-none"
              type="text"
              placeholder="Enter nickname"
              onChange={(e) => {
                setNewPlayer(e.target.value);
              }}
            />
            <button onClick={() => newPlayer && addFunc(newPlayer)}>ADD</button>
          </>
        ) : (
          <>
            <UserPlusIcon className="w-8 h-8 text-orange-500" />
            <span className="text-orange-500">Add new Player</span>
          </>
        )}
      </div>
    </div>
  );
};

export default EmptySlot;
