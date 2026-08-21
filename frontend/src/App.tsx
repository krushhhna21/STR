
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Splash } from './pages/Splash'
import { Onboarding } from './pages/Onboarding'

import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

import { Home } from './pages/Home'
import { StudyFlow } from './pages/StudyFlow'
import { Progress } from './pages/Progress'
import { Profile } from './pages/Profile'
import { AppLayout } from './components/layout/AppLayout'
import { TopBar } from './components/layout/TopBar'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { AdminLayout } from './pages/admin/AdminLayout'
import { CategoryManager } from './pages/admin/CategoryManager'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected App Routes */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="study/*" element={<StudyFlow />} />
          <Route path="tree" element={
            <div className="min-h-full flex flex-col">
              <div className="lg:hidden"><TopBar title="Study Tree" /></div>
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm"><span className="text-5xl">🌳</span></div>
                <h1 className="text-3xl font-black text-[#1E1B4B] mb-2">Study Tree</h1>
                <p className="text-gray-500 font-medium">Grow your focus tree by completing study sessions. Coming soon!</p>
              </div>
            </div>
          } />
          <Route path="progress" element={<Progress />} />
          <Route path="more" element={
            <div className="min-h-full flex flex-col">
              <div className="lg:hidden"><TopBar title="More" /></div>
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
                <div className="w-24 h-24 bg-gray-100 text-gray-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm"><span className="text-5xl">⚙️</span></div>
                <h1 className="text-3xl font-black text-[#1E1B4B] mb-2">More Features</h1>
                <p className="text-gray-500 font-medium">Settings, Support, and additional tools will be available here.</p>
              </div>
            </div>
          } />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Admin Portal</h2>
              <p className="text-gray-500">Select a section from the sidebar to manage content.</p>
            </div>
          } />
          <Route path="categories" element={<CategoryManager />} />
          <Route path="streams" element={<div className="p-8">Streams Manager Coming Soon</div>} />
          <Route path="materials" element={<div className="p-8">Materials Manager Coming Soon</div>} />
          <Route path="settings" element={<div className="p-8">Settings Coming Soon</div>} />
        </Route>
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
