import React from 'react'
import { Camera } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-4 shadow-lg">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">GalleryVault</h1>
          <p className="text-gray-400">Your personal photo storage</p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}