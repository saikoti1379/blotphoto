import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { GalleryPage } from './pages/GalleryPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <GalleryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App