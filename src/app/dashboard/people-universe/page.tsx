'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PeopleUniverseDashboard() {
  const [view, setView] = useState<'constellation' | 'list' | 'analytics'>('constellation')
  const [filterType, setFilterType] = useState<'all' | 'vip' | 'speaker' | 'sponsor' | 'regular'>('all')

  // Mock attendee data
  const attendees = [
    { id: 1, name: 'Sarah Chen', title: 'CTO', company: 'TechCorp', type: 'vip', checked: true, interests: ['AI', 'Cloud'], avatar: 'SC' },
    { id: 2, name: 'Michael Rodriguez', title: 'Product Manager', company: 'StartupX', type: 'speaker', checked: true, interests: ['Product', 'UX'], avatar: 'MR' },
    { id: 3, name: 'Emily Watson', title: 'Developer', company: 'DevCo', type: 'regular', checked: true, interests: ['Web3', 'AI'], avatar: 'EW' },
    { id: 4, name: 'David Kim', title: 'CEO', company: 'InnovateLabs', type: 'sponsor', checked: false, interests: ['Investment', 'Startups'], avatar: 'DK' },
    { id: 5, name: 'Lisa Anderson', title: 'Designer', company: 'CreativeStudio', type: 'regular', checked: true, interests: ['Design', 'UX'], avatar: 'LA' },
    { id: 6, name: 'James Wilson', title: 'Engineer', company: 'BuildTech', type: 'regular', checked: false, interests: ['Backend', 'DevOps'], avatar: 'JW' },
  ]

  const stats = {
    total: 1247,
    checkedIn: 892,
    vip: 45,
    speakers: 24,
    sponsors: 12
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'vip': return 'from-amber-500 to-amber-600'
      case 'speaker': return 'from-blue-500 to-blue-600'
      case 'sponsor': return 'from-purple-500 to-purple-600'
      default: return 'from-emerald-500 to-emerald-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'vip': return '👑'
      case 'speaker': return '🎤'
      case 'sponsor': return '💼'
      default: return '👤'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-emerald-100 shadow-lg shadow-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">EventOS</span>
                  <div className="text-xs text-emerald-600 font-medium -mt-1">People Universe</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 text-sm font-medium">{stats.checkedIn} / {stats.total} Checked In</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Switcher */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-xl p-1">
                <button
                  onClick={() => setView('constellation')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'constellation' 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Constellation
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'list' 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setView('analytics')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'analytics' 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Analytics
                </button>
              </div>

              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 bg-white/80 hover:bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl transition-colors border border-emerald-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Mission Control</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-gray-800 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Attendees</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-emerald-700 mb-1">{stats.checkedIn}</div>
              <div className="text-sm text-gray-600">Checked In</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-amber-700 mb-1">{stats.vip}</div>
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <span>👑</span>
                <span>VIP</span>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-700 mb-1">{stats.speakers}</div>
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <span>🎤</span>
                <span>Speakers</span>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-700 mb-1">{stats.sponsors}</div>
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <span>💼</span>
                <span>Sponsors</span>
              </div>
            </div>
          </div>

          {/* Constellation View */}
          {view === 'constellation' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Filters & AI Suggestions */}
              <div className="space-y-6">
                
                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-xl shadow-emerald-500/10">
                  <h3 className="text-lg font-bold text-emerald-800 mb-4">Filter Attendees</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filterType === 'all' 
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white' 
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <span className="font-medium">All Attendees</span>
                      <span className="text-sm">{stats.total}</span>
                    </button>
                    <button
                      onClick={() => setFilterType('vip')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filterType === 'vip' 
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' 
                          : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      <span className="font-medium flex items-center space-x-2">
                        <span>👑</span>
                        <span>VIP</span>
                      </span>
                      <span className="text-sm">{stats.vip}</span>
                    </button>
                    <button
                      onClick={() => setFilterType('speaker')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filterType === 'speaker' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      <span className="font-medium flex items-center space-x-2">
                        <span>🎤</span>
                        <span>Speakers</span>
                      </span>
                      <span className="text-sm">{stats.speakers}</span>
                    </button>
                    <button
                      onClick={() => setFilterType('sponsor')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filterType === 'sponsor' 
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      <span className="font-medium flex items-center space-x-2">
                        <span>💼</span>
                        <span>Sponsors</span>
                      </span>
                      <span className="text-sm">{stats.sponsors}</span>
                    </button>
                  </div>
                </div>

                {/* AI Networking Suggestions */}
                <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-2xl p-6 shadow-xl shadow-blue-500/10">
                  <div className="flex items-center space-x-2 mb-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-lg font-bold text-blue-800">AI Networking</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Smart matchmaking based on interests and goals</p>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-blue-800 mb-1">Sarah & Michael</p>
                      <p className="text-xs text-blue-600">Both interested in AI product development</p>
                      <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-700">
                        Suggest Introduction
                      </button>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-purple-800 mb-1">Emily & Lisa</p>
                      <p className="text-xs text-purple-600">UX design networking opportunity</p>
                      <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-purple-700">
                        Suggest Introduction
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-xl shadow-emerald-500/10">
                  <h3 className="text-lg font-bold text-emerald-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-3 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-semibold">Send Announcement</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="font-semibold">Add Attendee</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-xl transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="font-semibold">Export List</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Column - Constellation Visualization */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-3xl p-8 shadow-xl shadow-emerald-500/10 min-h-[600px]">
                  <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">Attendee Constellation Network</h2>
                  
                  {/* Visual Network Representation */}
                  <div className="relative h-[500px] bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8 overflow-hidden">
                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-white text-sm font-bold text-center">Tech<br/>Summit<br/>2024</span>
                      </div>
                    </div>

                    {/* Attendee Nodes - Arranged in orbit */}
                    {attendees.map((attendee, index) => {
                      const angle = (index / attendees.length) * 2 * Math.PI
                      const radius = 180
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      
                      return (
                        <div
                          key={attendee.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`
                          }}
                        >
                          {/* Connection Line */}
                          <div 
                            className="absolute w-1 bg-emerald-300/30 origin-left"
                            style={{
                              height: '2px',
                              width: `${radius}px`,
                              transform: `rotate(${angle + Math.PI}rad)`,
                              left: '50%',
                              top: '50%'
                            }}
                          ></div>

                          {/* Avatar */}
                          <div className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(attendee.type)} rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform`}>
                            <span className="text-white font-bold text-sm">{attendee.avatar}</span>
                          </div>

                          {/* Hover Card */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <div className="bg-white rounded-lg shadow-xl p-4 w-48 border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-lg">{getTypeIcon(attendee.type)}</span>
                                <span className="font-bold text-gray-800 text-sm">{attendee.name}</span>
                              </div>
                              <p className="text-xs text-gray-600 mb-1">{attendee.title}</p>
                              <p className="text-xs text-gray-500 mb-2">{attendee.company}</p>
                              <div className="flex flex-wrap gap-1">
                                {attendee.interests.map((interest, idx) => (
                                  <span key={idx} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                    {interest}
                                  </span>
                                ))}
                              </div>
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">Status:</span>
                                  <span className={`font-semibold ${attendee.checked ? 'text-emerald-600' : 'text-amber-600'}`}>
                                    {attendee.checked ? 'Checked In ✓' : 'Not Yet'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      💡 Hover over attendees to see their profiles. Lines show networking connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* List View */}
          {view === 'list' && (
            <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-3xl p-8 shadow-xl shadow-emerald-500/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-emerald-800">Attendee List</h2>
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search attendees..."
                    className="px-4 py-2 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Attendee</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendees.map((attendee) => (
                      <tr key={attendee.id} className="border-b border-gray-100 hover:bg-emerald-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(attendee.type)} rounded-full flex items-center justify-center`}>
                              <span className="text-white font-bold text-xs">{attendee.avatar}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{attendee.name}</div>
                              <div className="text-sm text-gray-600">{attendee.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{attendee.company}</td>
                        <td className="py-4 px-4">
                          <span className="text-lg">{getTypeIcon(attendee.type)}</span>
                        </td>
                        <td className="py-4 px-4">
                          {attendee.checked ? (
                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                              ✓ Checked In
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics View */}
          {view === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-3xl p-8 shadow-xl shadow-emerald-500/10">
                <h3 className="text-xl font-bold text-emerald-800 mb-4">Check-in Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Check-in</span>
                      <span className="font-bold text-emerald-700">{Math.round((stats.checkedIn / stats.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all" style={{ width: `${(stats.checkedIn / stats.total) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-3xl p-8 shadow-xl shadow-blue-500/10">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Networking Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI Introductions Made</span>
                    <span className="font-bold text-blue-700">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Conversations</span>
                    <span className="font-bold text-blue-700">43</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meeting Requests</span>
                    <span className="font-bold text-blue-700">89</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

