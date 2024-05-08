import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'tailwindcss/tailwind.css';
import Home from './Routes/Home';
import Settings from './Routes/Settings';
import Navbar from './Components/Shared/Navbar';
import { createContext, useState } from 'react';

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
    <SettingsContext.Provider value={[defaultPlayers, setDefaultPlayers]}>
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
