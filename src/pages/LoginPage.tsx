import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../contexts/AuthContext'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      } else {
        navigate('/gallery')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your gallery"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          size="lg"
        >
          Sign In
        </Button>

        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}