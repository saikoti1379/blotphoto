import React, { useState, useEffect } from 'react'
import { LogOut, Upload, Search, Grid, List, User, Camera } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { supabase } from '../lib/supabase'

interface UserProfile {
  first_name: string
  last_name: string
  username: string
  email: string
  mobile_number: string
}

export const GalleryPage: React.FC = () => {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        if (data) {
          setProfile(data)
        }
      }
    }

    fetchProfile()
  }, [user])

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">GalleryVault</h1>
                <p className="text-xs text-gray-400">
                  Welcome, {profile?.first_name || 'User'}
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <Input
                label=""
                icon={Search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your photos..."
                className="bg-gray-700/30"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-700/30 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Button icon={Upload} variant="primary">
                Upload
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
                <Button
                  icon={LogOut}
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome to your Gallery, {profile?.first_name}!
            </h2>
            <p className="text-gray-300 mb-4">
              Start uploading your photos to create your personal collection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-gray-400">Username</p>
                <p className="text-white font-medium">@{profile?.username}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-gray-400">Email</p>
                <p className="text-white font-medium">{profile?.email}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-gray-400">Mobile</p>
                <p className="text-white font-medium">{profile?.mobile_number}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 min-h-96">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Your gallery is empty
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Upload your first photos to start building your personal collection.
              Organize, search, and share your memories with ease.
            </p>
            <Button icon={Upload} size="lg">
              Upload Your First Photo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-gray-400 text-sm font-medium">Total Photos</h4>
            <p className="text-2xl font-bold text-white mt-1">0</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-gray-400 text-sm font-medium">Storage Used</h4>
            <p className="text-2xl font-bold text-white mt-1">0 MB</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-gray-400 text-sm font-medium">Albums</h4>
            <p className="text-2xl font-bold text-white mt-1">0</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <h4 className="text-gray-400 text-sm font-medium">Shared</h4>
            <p className="text-2xl font-bold text-white mt-1">0</p>
          </div>
        </div>
      </main>
    </div>
  )
}