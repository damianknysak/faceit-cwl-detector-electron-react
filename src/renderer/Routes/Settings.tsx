import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Settings = () => {
  return (
    <div>
      Settings
      <Link to={'/'}>Go to home</Link>
      <Outlet />
    </div>
  );
};

export default Settings;
