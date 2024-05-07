import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <span>Home</span>
      <Link to={'/settings'}>Go to settings</Link>
      <Outlet />
    </div>
  );
};

export default Home;
