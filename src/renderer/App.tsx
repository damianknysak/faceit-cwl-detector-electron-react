import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'tailwindcss/tailwind.css';
import Home from './Routes/Home';
import Settings from './Routes/Settings';
import Navbar from './Components/Shared/Navbar';
import { createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SettingsContext = createContext({});
export default function App() {
  const [defaultPlayers, setDefaultPlayers] = useState<string[]>([
    'ANNIHILATI0N',
    'CpereK',
    'vhajdus',
    'ZoQu15',
    'ffomzpom',
  ]);

  return (
    <SettingsContext.Provider
      value={{
        defaultPlayersState: [defaultPlayers, setDefaultPlayers],
      }}
    >
      <ToastContainer position="top-center" />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </SettingsContext.Provider>
  );
}
