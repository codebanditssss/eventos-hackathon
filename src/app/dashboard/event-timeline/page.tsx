'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EventTimelineDashboard() {
  const [view, setView] = useState<'timeline' | 'sessions' | 'speakers'>('timeline')
  const [selectedDay, setSelectedDay] = useState(1)

  // Mock event data
  const eventDays = [
    { day: 1, date: 'March 15', sessions: 8 },
    { day: 2, date: 'March 16', sessions: 10 },
    { day: 3, date: 'March 17', sessions: 6 }
  ]

  // Mock sessions data
  const sessions = [
    {
      id: 1,
      title: 'Keynote: Future of AI',
      speaker: 'Dr. Sarah Chen',
      time: '09:00 - 10:00',
      venue: 'Main Hall',
      attendees: 892,
      capacity: 1000,
      status: 'confirmed',
      type: 'keynote',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 2,
      title: 'AI in Product Development',
      speaker: 'John Martinez',
      time: '10:30 - 11:30',
      venue: 'Room A',
      attendees: 234,
      capacity: 300,
      status: 'confirmed',
      type: 'workshop',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Networking Lunch',
      speaker: null,
      time: '12:00 - 13:30',
      venue: 'Dining Hall',
      attendees: 1124,
      capacity: 1200,
      status: 'confirmed',
      type: 'networking',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 4,
      title: 'Startup Pitch Competition',
      speaker: 'Multiple Speakers',
      time: '14:00 - 16:00',
      venue: 'Main Hall',
      attendees: 567,
      capacity: 1000,
      status: 'confirmed',
      type: 'competition',
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 5,
      title: 'Machine Learning Workshop',
      speaker: 'Dr. Emily Zhang',
      time: '14:00 - 15:30',
      venue: 'Room B',
      attendees: 156,
      capacity: 200,
      status: 'confirmed',
      type: 'workshop',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 6,
      title: 'Sponsor Meetup',
      speaker: null,
      time: '16:30 - 17:30',
      venue: 'Lounge',
      attendees: 89,
      capacity: 100,
      status: 'tentative',
      type: 'networking',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 7,
      title: 'Closing Ceremony',
      speaker: 'Event Team',
      time: '18:00 - 19:00',
      venue: 'Main Hall',
      attendees: 734,
      capacity: 1000,
      status: 'confirmed',
      type: 'ceremony',
      color: 'from-pink-500 to-pink-600'
    }
  ]

  // Mock speakers data
  const speakers = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Chief AI Officer',
      company: 'TechCorp',
      sessions: 2,
      avatar: 'SC',
      bio: 'Leading AI researcher with 15+ years experience',
      status: 'confirmed'
    },
    {
      id: 2,
      name: 'John Martinez',
      title: 'VP of Engineering',
      company: 'InnovateLabs',
      sessions: 1,
      avatar: 'JM',
      bio: 'Product development expert and startup advisor',
      status: 'confirmed'
    },
    {
      id: 3,
      name: 'Dr. Emily Zhang',
      title: 'ML Research Lead',
      company: 'AI Dynamics',
      sessions: 1,
      avatar: 'EZ',
      bio: 'Machine learning specialist and author',
      status: 'confirmed'
    },
    {
      id: 4,
      name: 'Michael Roberts',
      title: 'CTO',
      company: 'DataFlow Inc',
      sessions: 1,
      avatar: 'MR',
      bio: 'Cloud architecture and scaling expert',
      status: 'pending'
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700'
      case 'tentative': return 'bg-amber-100 text-amber-700'
      case 'pending': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-indigo-100 shadow-lg shadow-indigo-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">EventOS</span>
                  <div className="text-xs text-indigo-600 font-medium -mt-1">Event Timeline</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span className="text-indigo-700 text-sm font-medium">24 Sessions Scheduled</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Day Selector */}
              <div className="hidden lg:flex items-center bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-1">
                {eventDays.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay === day.day 
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg' 
                        : 'text-indigo-700 hover:bg-indigo-50'
                    }`}
                  >
                    Day {day.day}
                    <div className="text-xs opacity-80">{day.date}</div>
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm border border-indigo-200 rounded-xl p-1">
                <button
                  onClick={() => setView('timeline')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'timeline' 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg' 
                      : 'text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setView('sessions')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'sessions' 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg' 
                      : 'text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  Sessions
                </button>
                <button
                  onClick={() => setView('speakers')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'speakers' 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg' 
                      : 'text-indigo-700 hover:bg-indigo-50'
                  }`}
                >
                  Speakers
                </button>
              </div>

              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 bg-white/80 hover:bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl transition-colors border border-indigo-200"
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

          {/* Timeline View */}
          {view === 'timeline' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-indigo-800">Day {selectedDay} Schedule</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25">
                  Add Session
                </button>
              </div>

              {/* Visual Timeline */}
              <div className="bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-3xl shadow-xl shadow-indigo-500/10 p-8">
                <div className="space-y-6">
                  {sessions.map((session, index) => (
                    <div key={session.id} className="relative">
                      {/* Timeline Line */}
                      {index < sessions.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-indigo-300 to-purple-300"></div>
                      )}
                      
                      <div className="flex items-start space-x-6">
                        {/* Time Marker */}
                        <div className="flex-shrink-0 w-24 text-right">
                          <div className="text-lg font-bold text-indigo-700">{session.time.split(' - ')[0]}</div>
                        </div>

                        {/* Session Dot */}
                        <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${session.color} rounded-full flex items-center justify-center shadow-lg relative z-10`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {session.type === 'keynote' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            )}
                            {session.type === 'workshop' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            )}
                            {session.type === 'networking' && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            )}
                            {(session.type === 'competition' || session.type === 'ceremony') && (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            )}
                          </svg>
                        </div>

                        {/* Session Card */}
                        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{session.title}</h3>
                              {session.speaker && (
                                <p className="text-sm text-gray-600 mb-2">👤 {session.speaker}</p>
                              )}
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>📍 {session.venue}</span>
                                <span>⏱️ {session.time}</span>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(session.status)}`}>
                              {session.status}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center space-x-4">
                              <div className="text-sm">
                                <span className="font-semibold text-gray-800">{session.attendees}</span>
                                <span className="text-gray-600"> / {session.capacity} attendees</span>
                              </div>
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`bg-gradient-to-r ${session.color} h-2 rounded-full`}
                                  style={{ width: `${(session.attendees / session.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-2">🎤</div>
                  <div className="text-3xl font-bold text-purple-700 mb-1">8</div>
                  <div className="text-sm text-gray-600">Sessions Today</div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-2">👥</div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">4,234</div>
                  <div className="text-sm text-gray-600">Total Registrations</div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-2">📍</div>
                  <div className="text-3xl font-bold text-emerald-700 mb-1">5</div>
                  <div className="text-sm text-gray-600">Active Venues</div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl mb-2">⚡</div>
                  <div className="text-3xl font-bold text-amber-700 mb-1">3</div>
                  <div className="text-sm text-gray-600">Live Sessions</div>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Grid View */}
          {view === 'sessions' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-indigo-800">All Sessions</h2>
                <div className="flex items-center space-x-3">
                  <select className="bg-white/80 border border-indigo-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>All Types</option>
                    <option>Keynotes</option>
                    <option>Workshops</option>
                    <option>Networking</option>
                  </select>
                  <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25">
                    Add Session
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                  <div key={session.id} className="bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`h-2 bg-gradient-to-r ${session.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800 flex-1">{session.title}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(session.status)}`}>
                          {session.status}
                        </div>
                      </div>
                      {session.speaker && (
                        <p className="text-sm text-gray-600 mb-3">👤 {session.speaker}</p>
                      )}
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div>⏱️ {session.time}</div>
                        <div>📍 {session.venue}</div>
                        <div className="flex items-center space-x-2">
                          <span>{session.attendees} / {session.capacity}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`bg-gradient-to-r ${session.color} h-1.5 rounded-full`}
                              style={{ width: `${(session.attendees / session.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <button className={`w-full bg-gradient-to-r ${session.color} hover:opacity-90 text-white py-2 rounded-lg font-semibold transition-opacity text-sm`}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speakers View */}
          {view === 'speakers' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-indigo-800">Event Speakers</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25">
                  Invite Speaker
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {speakers.map((speaker) => (
                  <div key={speaker.id} className="bg-white/80 backdrop-blur-lg border border-indigo-200 rounded-3xl p-8 shadow-xl shadow-indigo-500/10 hover:shadow-2xl transition-shadow">
                    <div className="flex items-start space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0">
                        {speaker.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">{speaker.name}</h3>
                            <p className="text-sm text-gray-600">{speaker.title}</p>
                            <p className="text-sm text-indigo-600 font-medium">{speaker.company}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(speaker.status)}`}>
                            {speaker.status}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">{speaker.bio}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="text-sm">
                            <span className="font-semibold text-indigo-700">{speaker.sessions}</span>
                            <span className="text-gray-600"> session{speaker.sessions > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium text-sm transition-colors">
                              View Profile
                            </button>
                            <button className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

