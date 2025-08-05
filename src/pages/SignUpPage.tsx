import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Phone, AtSign, AlertCircle, CheckCircle } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../contexts/AuthContext'

export const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Mobile number validation (basic format)
    const mobileRegex = /^[+]?[\d\s\-()]{10,}$/
    if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setErrors({})

    try {
      const { error } = await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        username: formData.username,
        email: formData.email
      })

      if (error) {
        setErrors({ general: error.message })
      } else {
        setSuccess(true)
        setTimeout(() => {
          navigate('/gallery')
        }, 2000)
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout
        title="Account Created!"
        subtitle="Welcome to GalleryVault"
      >
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-4">
            Your account has been created successfully!
          </p>
          <p className="text-gray-400 text-sm">
            Redirecting to your gallery...
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join GalleryVault today"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            icon={User}
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            error={errors.firstName}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            icon={User}
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Username"
          name="username"
          icon={AtSign}
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe"
          error={errors.username}
          required
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          error={errors.email}
          required
        />

        <Input
          label="Mobile Number"
          name="mobileNumber"
          type="tel"
          icon={Phone}
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          error={errors.mobileNumber}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
          error={errors.password}
          required
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          icon={Lock}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          required
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          size="lg"
        >
          Create Account
        </Button>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}