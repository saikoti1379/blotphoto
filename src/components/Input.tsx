import React, { forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-red-500 focus:border-transparent transition-all duration-200
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400 mt-1">{error}</p>
        )}
      </div>
    )
  }
)