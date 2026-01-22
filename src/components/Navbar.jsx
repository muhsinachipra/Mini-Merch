import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Store, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null; // Don't show navbar if not logged in (assuming login page is separate)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-8 text-primary flex items-center justify-center">
            <Store size={28} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[#101418] dark:text-white">Mini Merch</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {user.role === 'admin' ? (
            <NavLink 
              to="/admin"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${isActive ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-300'}`
              }
            >
              Dashboard
            </NavLink>
          ) : (
            <>
              <NavLink 
                to="/home"
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors ${isActive ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-300'}`
                }
              >
                Browse All
              </NavLink>
              <NavLink 
                to="/my-products"
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors ${isActive ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-300'}`
                }
              >
                My Inventory
              </NavLink>
              <NavLink 
                to="/add-product"
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors ${isActive ? 'text-primary dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-300'}`
                }
              >
                Upload Product
              </NavLink>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
             <span>{user.email}</span>
             <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase">{user.role}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <nav className="flex flex-col gap-4">
             {user.role === 'admin' ? (
                <Link to="/admin" className="text-sm font-medium text-gray-700 dark:text-gray-200" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
             ) : (
               <>
                <Link to="/home" className="text-sm font-medium text-gray-700 dark:text-gray-200" onClick={() => setIsMenuOpen(false)}>Browse All</Link>
                <Link to="/my-products" className="text-sm font-medium text-gray-700 dark:text-gray-200" onClick={() => setIsMenuOpen(false)}>My Inventory</Link>
                <Link to="/add-product" className="text-sm font-medium text-gray-700 dark:text-gray-200" onClick={() => setIsMenuOpen(false)}>Upload Product</Link>
               </>
             )}
             <button onClick={handleLogout} className="text-sm font-medium text-red-600 text-left">Log Out</button>
          </nav>
        </div>
      )}
    </header>
  );
}
