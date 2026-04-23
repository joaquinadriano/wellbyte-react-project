import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import AuthGuard from './components/AuthGuard'
import DashboardPage from './pages/DashboardPage'
import CalendarPage from './pages/CalendarPage'
import DevelopersPage from './pages/DevelopersPage'
import SupportResourcesPage from './pages/SupportResourcesPage'
import useAuthStore from './store/useAuthStore'
import { hydrateForUser } from './store/useStore'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/support" element={<SupportResourcesPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function AuthenticatedApp() {
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (user?.uid) hydrateForUser(user.uid)
  }, [user?.uid])

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <AnimatedRoutes />
    </div>
  )
}

export default function App() {
  const initAuthListener = useAuthStore((s) => s._initAuthListener)

  useEffect(() => {
    const unsubscribe = initAuthListener()
    return () => unsubscribe()
  }, [initAuthListener])

  return (
    <BrowserRouter>
      <AuthGuard>
        <AuthenticatedApp />
      </AuthGuard>
    </BrowserRouter>
  )
}
