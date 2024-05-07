import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      <span>Home</span>
      <Link to={'/settings'}>Go to settings</Link>
      <Outlet />
    </div>
  );
};

export default Home;
