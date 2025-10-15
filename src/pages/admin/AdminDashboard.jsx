import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, CheckSquare, Gift, TrendingUp, BarChart3, Shield, Settings } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const { userData } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTasks: 0,
    totalRewards: 0,
    avgLevel: 0
  })

  useEffect(() => {
    // Load admin stats
    // This would connect to admin API endpoints
    setStats({
      totalUsers: 42,
      activeTasks: 156,
      totalRewards: 24,
      avgLevel: 3.5
    })
  }, [])

  const adminStats = [
    {
      icon: Users,
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'from-primary to-primary-light',
      bgColor: 'bg-primary/10'
    },
    {
      icon: CheckSquare,
      label: 'Active Tasks',
      value: stats.activeTasks,
      color: 'from-success to-green-400',
      bgColor: 'bg-success/10'
    },
    {
      icon: Gift,
      label: 'Total Rewards',
      value: stats.totalRewards,
      color: 'from-secondary to-secondary-light',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: TrendingUp,
      label: 'Avg User Level',
      value: stats.avgLevel.toFixed(1),
      color: 'from-error to-red-400',
      bgColor: 'bg-error/10'
    }
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <Shield className="mr-3 text-primary" size={40} />
              Admin Dashboard
            </h1>
            <p className="text-text-secondary dark:text-text-dark">
              Welcome back, {userData?.display_name || 'Admin'}! Manage users, tasks, and rewards
            </p>
          </div>
          <Link
            to="/admin/profile"
            className="btn-primary flex items-center space-x-2 whitespace-nowrap"
          >
            <Settings size={20} />
            <span>Admin Profile</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary dark:text-text-dark text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} size={32} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-primary">
              <Users size={20} className="inline mr-2" />
              Manage Users
            </button>
            <button className="btn-primary">
              <CheckSquare size={20} className="inline mr-2" />
              Manage Tasks
            </button>
            <button className="btn-primary">
              <Gift size={20} className="inline mr-2" />
              Manage Rewards
            </button>
          </div>
        </motion.div>

        {/* Analytics Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="mr-2" />
            Analytics Overview
          </h2>
          <div className="text-center py-12 text-text-secondary dark:text-text-dark">
            <p>Analytics charts and reports will be displayed here</p>
            <p className="text-sm mt-2">User engagement, task completion trends, and more</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
