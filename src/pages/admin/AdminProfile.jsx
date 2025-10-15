import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Mail, Shield, Settings, Activity, Users, 
  Database, Server, Clock, CheckCircle, AlertTriangle,
  Edit2, Save, Key, Bell, Lock, Eye, EyeOff
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const AdminProfile = () => {
  const { userData, currentUser, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState(userData?.display_name || '')
  const [showApiKey, setShowApiKey] = useState(false)
  
  // Admin Settings State
  const [adminSettings, setAdminSettings] = useState({
    emailNotifications: true,
    userRegistrationAlerts: true,
    systemAlerts: true,
    weeklyReports: true,
    autoBackup: true,
    maintenanceMode: false
  })

  const handleSaveProfile = async () => {
    try {
      // API call to update admin profile
      toast.success('Admin profile updated!')
      setEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleToggleSetting = (setting) => {
    setAdminSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
    toast.success('Setting updated!')
  }

  const adminStats = [
    {
      icon: Shield,
      label: 'Admin Level',
      value: 'Super Admin',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Users,
      label: 'Users Managed',
      value: '42',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: Activity,
      label: 'System Uptime',
      value: '99.9%',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Database,
      label: 'Database Size',
      value: '2.4 GB',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ]

  const recentActivities = [
    {
      action: 'User Registration',
      user: 'john.doe@example.com',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      action: 'System Backup',
      user: 'Automated',
      time: '2 hours ago',
      status: 'success'
    },
    {
      action: 'Failed Login Attempt',
      user: 'unknown@example.com',
      time: '3 hours ago',
      status: 'warning'
    },
    {
      action: 'Database Optimization',
      user: 'Admin',
      time: '1 day ago',
      status: 'success'
    }
  ]

  const systemInfo = [
    { label: 'Server Status', value: 'Online', status: 'success' },
    { label: 'Last Backup', value: '2 hours ago', status: 'success' },
    { label: 'Database Status', value: 'Healthy', status: 'success' },
    { label: 'API Status', value: 'Operational', status: 'success' },
    { label: 'Storage Used', value: '45%', status: 'warning' },
    { label: 'Memory Usage', value: '62%', status: 'warning' }
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Shield className="mr-3 text-primary" size={40} />
            Admin Profile
          </h1>
          <p className="text-text-secondary dark:text-text-dark">
            Manage your admin account and system settings
          </p>
        </div>

        {/* Admin Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar with Admin Badge */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-error flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                {userData?.display_name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                <Shield size={12} />
                <span>ADMIN</span>
              </div>
            </div>

            {/* Admin Info */}
            <div className="flex-1 text-center md:text-left">
              {editing ? (
                <div className="flex items-center space-x-3 mb-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input-field"
                    placeholder="Your name"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="p-3 bg-success text-white rounded-lg hover:bg-success/90"
                  >
                    <Save size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">
                    {userData?.display_name || 'Admin User'}
                  </h1>
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <Edit2 size={20} />
                  </button>
                </div>
              )}
              
              <div className="flex items-center justify-center md:justify-start space-x-2 text-text-secondary dark:text-text-dark mb-4">
                <Mail size={16} />
                <span>{currentUser?.email}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/30">
                  <Shield size={20} className="text-primary" />
                  <span className="font-bold text-primary">Super Admin</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-lg">
                  <CheckCircle size={20} className="text-success" />
                  <span className="font-bold text-success">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admin Stats Grid */}
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
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={stat.color} size={28} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Server className="mr-2 text-primary" />
              System Information
            </h2>
            
            <div className="space-y-4">
              {systemInfo.map((info, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="font-medium">{info.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${
                      info.status === 'success' ? 'text-success' : 
                      info.status === 'warning' ? 'text-yellow-500' : 
                      'text-error'
                    }`}>
                      {info.value}
                    </span>
                    {info.status === 'success' ? (
                      <CheckCircle size={16} className="text-success" />
                    ) : (
                      <AlertTriangle size={16} className="text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Admin Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Settings className="mr-2 text-primary" />
              Admin Settings
            </h2>
            
            <div className="space-y-4">
              {Object.entries(adminSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {key === 'emailNotifications' && <Bell size={18} />}
                    {key === 'userRegistrationAlerts' && <Users size={18} />}
                    {key === 'systemAlerts' && <AlertTriangle size={18} />}
                    {key === 'weeklyReports' && <Activity size={18} />}
                    {key === 'autoBackup' && <Database size={18} />}
                    {key === 'maintenanceMode' && <Lock size={18} />}
                    <span className="font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleSetting(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* API Key Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Key className="mr-2 text-primary" />
            API Access
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Admin API Key</span>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                >
                  {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                {showApiKey ? 'sk_live_XXXX_example_key_placeholder_XXXX' : '••••••••••••••••••••••••••••••••••••••'}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="btn-primary flex-1">
                <Key size={18} className="inline mr-2" />
                Regenerate Key
              </button>
              <button className="btn-secondary flex-1">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </motion.div>

        {/* Recent Admin Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Activity className="mr-2 text-primary" />
            Recent Admin Activities
          </h2>
          
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-error'
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-text-secondary dark:text-text-dark">
                      {activity.user}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary dark:text-text-dark">
                  <Clock size={14} />
                  <span className="text-sm">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminProfile
