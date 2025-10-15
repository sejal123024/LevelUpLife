import { Link, useLocation } from 'react-router-dom'
import { Home, CheckSquare, Gift, User, Moon, Sun, LogOut, Trophy, Zap, Sword } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const location = useLocation()
  const { logout, userData } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/quests', icon: Sword, label: 'Quests' },
    { path: '/challenges', icon: Zap, label: 'Challenges' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/rewards-store', icon: Gift, label: 'Rewards' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="glass-effect border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-display font-bold text-xl text-gradient hidden sm:block">
                Level Up Life
              </span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-text-secondary dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-primary">Lv {userData?.level || 1}</span>
              <span className="text-gray-300">|</span>
              <span className="text-2xl">💰</span>
              <span className="font-bold text-secondary">{userData?.coins || 0}</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-error transition-colors"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around py-2 border-t border-gray-200 dark:border-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-text-secondary dark:text-text-dark'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
