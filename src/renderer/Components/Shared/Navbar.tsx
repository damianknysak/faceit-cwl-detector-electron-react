import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HomeIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from 'images/faceit_blue.png';

const Navbar = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  return (
    <nav className="w-40 h-full border-r-2 border-gray-600 flex flex-col">
      <div className="relative mb-10">
        <img className="w-40" src={logo} alt="Logo" />
      </div>
      <ul className="w-full">
        <li className="mb-6 relative">
          <div
            className={`absolute top-1/2 bg-[#1dbac5] w-2 h-2 rounded-full ${
              activeRoute === '/' ? 'block' : 'hidden'
            }`}
          ></div>
          <Link className="flex justify-center" to="/">
            <HomeIcon
              className={`${
                activeRoute === '/' ? 'text-[#1dbac5]' : 'text-gray-500'
              } size-10`}
            />
          </Link>
        </li>
        <li className="mb-6 relative">
          <div
            className={`absolute top-1/2 bg-[#1dbac5] w-2 h-2 rounded-full ${
              activeRoute === '/search' ? 'block' : 'hidden'
            }`}
          ></div>
          <Link className="flex justify-center" to="/search">
            <MagnifyingGlassIcon
              className={`${
                activeRoute === '/search' ? 'text-[#1dbac5]' : 'text-gray-500'
              } size-10`}
            />
          </Link>
        </li>
        <li className="mb-6 relative">
          <div
            className={`absolute top-1/2 bg-[#1dbac5] w-2 h-2 rounded-full ${
              activeRoute === '/settings' ? 'block' : 'hidden'
            }`}
          ></div>
          <Link className="flex justify-center" to="/settings">
            <AdjustmentsVerticalIcon
              className={`${
                activeRoute === '/settings' ? 'text-[#1dbac5]' : 'text-gray-500'
              } size-10`}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
