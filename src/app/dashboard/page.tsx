'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-32 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Floating Navigation Header */}
      <nav className="absolute top-6 left-6 right-6 z-50">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                🚀 EventOS
              </Link>
              <div className="hidden md:block text-white/70 text-sm">
                Mission Control
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-4 text-white/80 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>3 Active Events</span>
                </div>
                <div className="text-white/50">|</div>
                <div>{currentTime.toLocaleTimeString()}</div>
              </div>
              
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search universe..."
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-48"
                  />
                  <div className="absolute right-3 top-2.5 text-white/50">🔍</div>
                </div>
              </div>
              
              {/* Profile */}
              <div className="relative">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl px-4 py-2 text-white hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">👤</span>
                  </div>
                  <span className="hidden md:block">Commander</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Universe Container */}
      <div className="pt-24 pb-8 px-6 h-screen flex flex-col">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Event Universe
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Welcome to your cosmic event command center. Navigate through your event galaxy with infinite possibilities.
          </p>
        </div>

        {/* Central Universe Container */}
        <div className="flex-1 relative">
          {/* This will be the main orbital dashboard container */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Central Event Sphere Placeholder */}
            <div className="relative">
              {/* Main Event Sphere */}
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="text-xl font-bold">Tech Summit 2024</h3>
                  <p className="text-sm opacity-80">March 15-17</p>
                  <div className="mt-2 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-xs">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Orbital Ring */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin" style={{width: '120%', height: '120%', left: '-10%', top: '-10%'}}></div>
              <div className="absolute inset-0 border border-white/10 rounded-full animate-spin" style={{width: '140%', height: '140%', left: '-20%', top: '-20%', animationDirection: 'reverse', animationDuration: '20s'}}></div>
            </div>

            {/* Floating Action Bubbles - Positioned around the central sphere */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              
              {/* AI Copilot Button */}
              <div className="absolute -top-32 -left-4 animate-bounce">
                <button className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full shadow-lg shadow-emerald-500/50 flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-300">
                  🤖
                </button>
                <div className="text-white/70 text-xs text-center mt-2">AI Copilot</div>
              </div>

              {/* Quick Add Button */}
              <div className="absolute -top-20 left-20 animate-bounce delay-300">
                <button className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center text-white text-xl hover:scale-110 transition-transform duration-300">
                  ➕
                </button>
                <div className="text-white/70 text-xs text-center mt-1">Quick Add</div>
              </div>

              {/* Emergency Button */}
              <div className="absolute top-20 -right-16 animate-bounce delay-700">
                <button className="w-14 h-14 bg-gradient-to-r from-red-400 to-orange-500 rounded-full shadow-lg shadow-red-500/50 flex items-center justify-center text-white text-xl hover:scale-110 transition-transform duration-300">
                  🚨
                </button>
                <div className="text-white/70 text-xs text-center mt-1">Emergency</div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-3">
                <div className="flex items-center space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">1,247 Attendees</span>
                  </div>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">12 Vendors</span>
                  </div>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">5 Sponsors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Arc */}
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-8 py-4">
              <div className="flex items-center space-x-6">
                <button className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg">
                  🏠
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:bg-white/30 hover:scale-110 transition-all duration-300">
                  👥
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:bg-white/30 hover:scale-110 transition-all duration-300">
                  📊
                </button>
                <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:bg-white/30 hover:scale-110 transition-all duration-300">
                  ⚙️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
