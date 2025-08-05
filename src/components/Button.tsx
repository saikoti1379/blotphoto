import React from 'react'
import { Loader2, LucideIcon } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: LucideIcon
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800'
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500',
    outline: 'border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const isDisabled = disabled || loading

  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      {children}
    </button>
  )
}