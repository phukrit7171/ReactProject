import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../../constants/routes';
import { logout } from '../../features/auth/authSlice';
import Avatar from '../common/Avatar';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const navLinks = [
    { path: ROUTES.CHAT, label: 'Chat' },
    { path: ROUTES.FRIENDS, label: 'Friends' },
    { path: ROUTES.SETTINGS, label: 'Settings' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="text-xl font-bold text-blue-600">
              Messaging App
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === link.path
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Avatar
                  src={user?.avatar}
                  alt={user?.name}
                  size="sm"
                />
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to={ROUTES.LOGIN}
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;