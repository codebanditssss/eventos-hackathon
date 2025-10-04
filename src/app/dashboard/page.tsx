'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { 
  Users, Calendar, Activity, TrendingUp, AlertCircle, 
  Clock, MapPin, Zap, BarChart3, MessageSquare,
  Settings, Bell, Search, Plus, Building2, Target,
  Sparkles, ArrowUpRight, CheckCircle2, XCircle
} from 'lucide-react'

// Dynamically import 3D component (client-side only)
const EventUniverse3D = dynamic(() => import('@/components/EventUniverse3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-blue-600 font-semibold">Loading 3D Universe...</p>
      </div>
    </div>
  )
})

export default function MissionControlDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(0)
  const [aiCopilotOpen, setAiCopilotOpen] = useState(false)
  const [dataFlow, setDataFlow] = useState(0)

  // EventOS-specific event data with real event management context
  const events = [
    {
      id: 1,
      name: "Tech Summit 2025",
      type: "Conference",
      venue: "San Francisco Convention Center",
      date: "Oct 4-6, 2025",
      status: "live",
      attendees: { registered: 1247, checkedIn: 892, vip: 45 },
      vendors: { total: 12, active: 8, pending: 4 },
      sponsors: { total: 5, platinum: 1, gold: 2, silver: 2 },
      sessions: { total: 24, live: 3, upcoming: 8 },
      progress: 65,
      urgentTasks: 3,
      notifications: 7,
      theme: "from-blue-600 to-indigo-700",
      daysUntil: 0 // Today
    },
    {
      id: 2,
      name: "Startup Pitch Night",
      type: "Networking",
      venue: "Innovation Hub Downtown",
      date: "Oct 15, 2025",
      status: "upcoming",
      attendees: { registered: 456, checkedIn: 0, vip: 12 },
      vendors: { total: 8, active: 6, pending: 2 },
      sponsors: { total: 3, platinum: 0, gold: 1, silver: 2 },
      sessions: { total: 12, live: 0, upcoming: 12 },
      progress: 85,
      urgentTasks: 1,
      notifications: 3,
      theme: "from-emerald-600 to-teal-700",
      daysUntil: 11
    },
    {
      id: 3,
      name: "AI Innovation Workshop",
      type: "Workshop",
      venue: "Tech Campus Building A",
      date: "Nov 2-4, 2025",
      status: "planning",
      attendees: { registered: 234, checkedIn: 0, vip: 8 },
      vendors: { total: 15, active: 5, pending: 10 },
      sponsors: { total: 7, platinum: 2, gold: 3, silver: 2 },
      sessions: { total: 18, live: 0, upcoming: 18 },
      progress: 40,
      urgentTasks: 8,
      notifications: 12,
      theme: "from-purple-600 to-violet-700",
      daysUntil: 29
    }
  ]

  const currentEvent = events[selectedEvent]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const dataFlowTimer = setInterval(() => {
      setDataFlow(prev => (prev + 1) % 360)
    }, 100)
    return () => clearInterval(dataFlowTimer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
      {/* Modern Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 70%)
          `
        }}></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Simplified Professional Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Left: Brand + Event Name */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">EventOS</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-semibold text-gray-900">{currentEvent.name}</h1>
                  <span className={`flex items-center space-x-1 px-2 py-1 text-xs font-bold rounded-full ${
                    currentEvent.status === 'live' ? 'bg-emerald-100 text-emerald-700' :
                    currentEvent.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {currentEvent.status === 'live' && <Activity className="w-3 h-3" />}
                    {currentEvent.status === 'upcoming' && <Clock className="w-3 h-3" />}
                    {currentEvent.status === 'planning' && <Settings className="w-3 h-3" />}
                    <span>{currentEvent.status.toUpperCase()}</span>
                  </span>
              </div>
            </div>
            
            {/* Right: Key Metrics + Actions */}
            <div className="flex items-center space-x-6">
              {/* Compact Stats */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{currentEvent.attendees.checkedIn}</span>
                  <span className="text-gray-500">/{currentEvent.attendees.registered}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{currentEvent.sessions.live}</span>
                  <span className="text-gray-500">live</span>
                </div>
                {currentEvent.urgentTasks > 0 && (
                  <div className="flex items-center space-x-1.5 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">{currentEvent.urgentTasks}</span>
            </div>
                )}
                  </div>
              
              {/* Quick Actions */}
              <button 
                onClick={() => setAiCopilotOpen(!aiCopilotOpen)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  aiCopilotOpen 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Copilot</span>
              </button>
              
              <button className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                KD
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Mission Control Interface */}
      <div className="pt-14 min-h-screen flex overflow-y-auto">
        
        {/* Enhanced AI Copilot Sidebar */}
        {aiCopilotOpen && (
          <div className="w-96 bg-white/95 backdrop-blur-lg border-r border-blue-200 shadow-xl shadow-blue-500/10 overflow-y-auto">
            {/* AI Copilot Header */}
            <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-800">AI Event Copilot</h3>
                  <p className="text-sm text-blue-600">Replacing your entire event planning team</p>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <p className="text-xs text-blue-700 font-medium">
                  💡 I've analyzed 1,247+ similar events to optimize your {currentEvent.name}
                </p>
        </div>
        </div>

            {/* AI Suggestions */}
            <div className="p-6 space-y-4">
              {/* Urgent Task Alert */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                        </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-800 mb-1">Urgent: Task Prioritization</h4>
                    <p className="text-sm text-amber-700 mb-3">
                      {currentEvent.name} has {currentEvent.urgentTasks} critical tasks requiring immediate attention. Based on similar events, I recommend addressing catering logistics first.
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-xs bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-2 rounded-lg hover:from-amber-700 hover:to-amber-800 font-medium shadow-sm">
                        Auto-prioritize tasks
                      </button>
                      <button className="text-xs bg-white text-amber-700 border border-amber-300 px-3 py-2 rounded-lg hover:bg-amber-50 font-medium">
                        Show task details
                      </button>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Success Insight */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-emerald-800 mb-1">Opportunity Detected</h4>
                    <p className="text-sm text-emerald-700 mb-3">
                      Registration is 18% above target! Similar events saw 25% revenue increase by opening premium networking sessions.
                    </p>
                    <button className="text-xs bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 font-medium shadow-sm">
                      Create premium add-ons
                    </button>
                  </div>
                        </div>
                      </div>

              {/* Vendor Coordination */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-800 mb-1">Smart Vendor Sync</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      I can automatically coordinate with your {currentEvent.vendors.total} vendors and send setup reminders 48h before the event.
                    </p>
                    <div className="flex space-x-2">
                      <button className="text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium shadow-sm">
                        Enable auto-coordination
                      </button>
                    </div>
                      </div>
                    </div>
                  </div>
                </div>

            {/* AI Chat Input */}
            <div className="border-t border-blue-100 p-6 bg-gradient-to-r from-blue-50/50 to-emerald-50/50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask me anything: 'How can I increase sponsor ROI?' or 'Generate event timeline'"
                  className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                />
                <button className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                <MessageSquare className="w-3 h-3 inline" /> Powered by EventOS AI • Trained on 10,000+ successful events
              </p>
                        </div>
                      </div>
        )}

        {/* Enhanced Central Command Interface */}
        <div className="flex-1 relative p-4 md:p-6 lg:p-8 overflow-y-auto">
          
          {/* Welcome Banner with Event Countdown */}
          <div className="mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-4 md:p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Welcome back, Khushi!
                </h2>
                <p className="text-blue-100">Your event command center is ready • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="text-right bg-white/10 backdrop-blur-lg rounded-xl px-6 py-4 border border-white/20">
                <div className="text-sm text-blue-100 mb-1">Event Starts In</div>
                <div className="text-4xl font-bold">
                  {currentEvent.daysUntil === 0 ? (
                    <span className="flex items-center space-x-2">
                      <Activity className="w-8 h-8 animate-pulse" />
                      <span>LIVE NOW</span>
                    </span>
                  ) : (
                    <span>{currentEvent.daysUntil} Days</span>
                  )}
                      </div>
                <div className="text-xs text-blue-200 mt-1">{currentEvent.date}</div>
                    </div>
                  </div>
                </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 pb-8">
            
            {/* Left Column - Quick Stats & Dashboard Navigation */}
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              
              {/* EventOS Dashboard Navigation */}
              <div className="bg-white/90 backdrop-blur-xl border border-blue-100 rounded-2xl p-6 shadow-2xl shadow-blue-500/20">
                <h3 className="text-lg font-bold text-blue-800 mb-4">EventOS Dashboards</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl shadow-lg shadow-blue-500/25">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Mission Control</div>
                      <div className="text-xs opacity-90">Current</div>
                    </div>
                  </button>
                  
                  <Link href="/dashboard/event-architect" className="w-full flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Event Architect</div>
                      <div className="text-xs opacity-70">AI Planning</div>
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/people-universe" className="w-full flex items-center space-x-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold text-sm">People Universe</div>
                      <div className="text-xs opacity-70">Attendees</div>
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/vendor-command" className="w-full flex items-center space-x-3 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Vendor Command</div>
                      <div className="text-xs opacity-70">Suppliers</div>
                      </div>
                  </Link>
                  
                  <Link href="/dashboard/analytics-observatory" className="w-full flex items-center space-x-3 bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Analytics Observatory</div>
                      <div className="text-xs opacity-70">Insights</div>
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/communication-hub" className="w-full flex items-center space-x-3 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Communication Hub</div>
                      <div className="text-xs opacity-70">Messaging</div>
                      </div>
                  </Link>
                  
                  <Link href="/dashboard/event-timeline" className="w-full flex items-center space-x-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold text-sm">Event Timeline</div>
                      <div className="text-xs opacity-70">Schedule</div>
                    </div>
                  </Link>
                        </div>
                      </div>

              {/* Mini Venue Map */}
              <div className="bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-2xl p-6 shadow-2xl shadow-indigo-500/15">
                <h3 className="text-lg font-bold text-indigo-800 mb-4 flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Venue Status</span>
                </h3>
                <div className="space-y-3">
                  {/* Mini Floor Plan */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {/* Main Hall */}
                      <div className="bg-emerald-500 text-white rounded-lg p-3 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-600 opacity-50 animate-pulse"></div>
                        <div className="relative z-10">
                          <div className="text-xs font-bold">Main Hall</div>
                          <div className="text-lg font-bold">892</div>
                          <div className="text-xs">Live Now</div>
                        </div>
                      </div>
                      {/* Room A */}
                      <div className="bg-blue-500 text-white rounded-lg p-3 text-center">
                        <div className="text-xs font-bold">Room A</div>
                        <div className="text-lg font-bold">234</div>
                        <div className="text-xs">Active</div>
                      </div>
                      {/* Room B */}
                      <div className="bg-gray-300 text-gray-700 rounded-lg p-3 text-center">
                        <div className="text-xs font-bold">Room B</div>
                        <div className="text-lg font-bold">0</div>
                        <div className="text-xs">Empty</div>
                      </div>
                      {/* Expo Hall */}
                      <div className="bg-purple-500 text-white rounded-lg p-3 text-center">
                        <div className="text-xs font-bold">Expo Hall</div>
                        <div className="text-lg font-bold">156</div>
                        <div className="text-xs">Networking</div>
                        </div>
                      </div>
                    <div className="text-xs text-center text-indigo-700 font-medium">
                      <Building2 className="w-3 h-3 inline mr-1" />
                      {currentEvent.venue}
                      </div>
                    </div>
                  </div>
                </div>

              {/* Quick Event Stats */}
              <div className="bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-2xl p-6 shadow-2xl shadow-emerald-500/15">
                <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Live Event Stats</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Check-in Progress</span>
                    <span className="font-bold text-emerald-700">{Math.round((currentEvent.attendees.checkedIn / currentEvent.attendees.registered) * 100)}%</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(currentEvent.attendees.checkedIn / currentEvent.attendees.registered) * 100}%` }}
                    ></div>
                        </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700">{currentEvent.sessions.live}</div>
                      <div className="text-xs text-gray-600">Live Sessions</div>
                      </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">{currentEvent.vendors.active}</div>
                      <div className="text-xs text-gray-600">Active Vendors</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Center Column - Event Command Center */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Top Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Attendance</span>
                    <span className="text-emerald-600">↑ 12%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{currentEvent.attendees.checkedIn}</div>
                  <div className="text-sm text-gray-500">of {currentEvent.attendees.registered} registered</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${(currentEvent.attendees.checkedIn/currentEvent.attendees.registered)*100}%`}}></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Live Sessions</span>
                    <span className="text-blue-600">● Active</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{currentEvent.sessions.live}</div>
                  <div className="text-sm text-gray-500">{currentEvent.sessions.upcoming} upcoming</div>
                  <div className="mt-2 flex space-x-1">
                    {[...Array(currentEvent.sessions.live)].map((_, i) => (
                      <div key={i} className="flex-1 bg-blue-500 rounded-full h-2"></div>
                    ))}
                    {[...Array(3 - currentEvent.sessions.live)].map((_, i) => (
                      <div key={i} className="flex-1 bg-gray-200 rounded-full h-2"></div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className="text-purple-600">87%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">High</div>
                  <div className="text-sm text-gray-500">Above average</div>
                  <div className="mt-2 flex space-x-1">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`flex-1 h-6 rounded ${i <= 3 ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-amber-600">{currentEvent.progress}%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">On Track</div>
                  <div className="text-sm text-gray-500">Event milestone</div>
                  <div className="mt-2 relative w-12 h-12">
                    <svg className="transform -rotate-90 w-12 h-12">
                      <circle cx="24" cy="24" r="20" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                      <circle cx="24" cy="24" r="20" stroke="#F59E0B" strokeWidth="4" fill="none"
                        strokeDasharray={`${2 * Math.PI * 20}`}
                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - currentEvent.progress/100)}`} />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Session Engagement Chart */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Engagement (Live)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">AI in Product Development</span>
                        <span className="text-blue-600 font-bold">98%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{width: '98%'}}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">456 attendees • Main Hall</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">ML Workshop</span>
                        <span className="text-emerald-600 font-bold">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full" style={{width: '87%'}}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">234 attendees • Room A</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">Keynote Q&A</span>
                        <span className="text-purple-600 font-bold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">892 attendees • Main Stage</div>
                    </div>
                  </div>
                </div>

                {/* Sponsor Impressions */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sponsor Impressions (Today)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold">
                          TC
                        </div>
                      <div>
                          <div className="font-semibold text-gray-900">TechCorp</div>
                          <div className="text-xs text-gray-500">Platinum Sponsor</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">8,234</div>
                        <div className="text-xs text-emerald-600">↑ 23%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold">
                          IL
                        </div>
                      <div>
                          <div className="font-semibold text-gray-900">InnovateLabs</div>
                          <div className="text-xs text-gray-500">Gold Sponsor</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">5,127</div>
                        <div className="text-xs text-emerald-600">↑ 15%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold">
                          SH
                        </div>
                      <div>
                          <div className="font-semibold text-gray-900">StartupHub</div>
                          <div className="text-xs text-gray-500">Silver Sponsor</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">2,943</div>
                        <div className="text-xs text-emerald-600">↑ 8%</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-sm text-gray-600">Total Impressions</div>
                      <div className="text-2xl font-bold text-gray-900">16,304</div>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Event Selector */}
              <div className="flex items-center justify-center space-x-2">
                {events.map((event, index) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedEvent === index 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {event.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Live Updates & Actions */}
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              
              {/* Urgent Tasks */}
              <div className="bg-white/90 backdrop-blur-xl border border-amber-100 rounded-2xl p-6 shadow-2xl shadow-amber-500/15">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-bold text-amber-800">Urgent Tasks</h3>
                  <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {currentEvent.urgentTasks}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-amber-800">Catering Setup Delay</p>
                    <p className="text-xs text-amber-600 mt-1">Vendor running 2h behind schedule</p>
                    <button className="text-xs bg-amber-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-amber-700">
                      Contact Vendor
                    </button>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-red-800">AV Equipment Issue</p>
                    <p className="text-xs text-red-600 mt-1">Main stage microphone not working</p>
                    <button className="text-xs bg-red-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-red-700">
                      Emergency Fix
                    </button>
                </div>
              </div>
            </div>

              {/* Quick Actions */}
              <div className="bg-white/90 backdrop-blur-xl border border-blue-100 rounded-2xl p-6 shadow-2xl shadow-blue-500/15">
                <h3 className="text-lg font-bold text-blue-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-semibold">Add New Session</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="font-semibold">Send Announcement</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-semibold">Generate Report</span>
                  </button>
              </div>
            </div>

              {/* Today's Session Timeline */}
              <div className="bg-white/90 backdrop-blur-xl border border-indigo-100 rounded-2xl p-6 shadow-2xl shadow-indigo-500/15">
                <h3 className="text-lg font-bold text-indigo-800 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Today's Timeline</span>
                </h3>
                <div className="space-y-3">
                  {/* Current Time Indicator */}
                  <div className="flex items-center space-x-2 text-sm font-bold text-indigo-600">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                    <span>Now: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  {/* Timeline Items */}
                  <div className="relative space-y-4 pl-4 border-l-2 border-indigo-200">
                    {/* Past Session */}
                    <div className="relative">
                      <div className="absolute -left-[21px] w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 font-medium">08:00 - 09:00</div>
                        <div className="text-sm font-semibold text-gray-700">Registration</div>
                        <div className="text-xs text-gray-500 mt-1">✓ Completed</div>
              </div>
            </div>

                    {/* Current Session */}
                    <div className="relative">
                      <div className="absolute -left-[21px] w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-3 border border-emerald-200">
                        <div className="text-xs text-emerald-700 font-bold">09:00 - 10:00 • LIVE</div>
                        <div className="text-sm font-bold text-emerald-900">Opening Keynote</div>
                        <div className="text-xs text-emerald-700 mt-1 flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>892 attendees</span>
                        </div>
              </div>
            </div>

                    {/* Next Session */}
                    <div className="relative">
                      <div className="absolute -left-[21px] w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-xs text-blue-600 font-medium">10:30 - 11:30 • Next</div>
                        <div className="text-sm font-semibold text-blue-900">AI Workshop</div>
                        <div className="text-xs text-blue-600 mt-1">Room A</div>
              </div>
            </div>

                    {/* Upcoming */}
                    <div className="relative">
                      <div className="absolute -left-[21px] w-4 h-4 bg-purple-400 rounded-full border-2 border-white"></div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-xs text-purple-600 font-medium">14:00 - 15:30</div>
                        <div className="text-sm font-semibold text-purple-900">Panel Discussion</div>
                        <div className="text-xs text-purple-600 mt-1">Main Stage</div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

              {/* Live Feed */}
              <div className="bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-2xl p-6 shadow-2xl shadow-emerald-500/15">
                <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Live Activity</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 animate-pulse"></div>
                      <div>
                      <p className="font-semibold text-gray-800">New Registration</p>
                      <p className="text-gray-600 text-xs">Sarah Chen registered for VIP package</p>
                      <p className="text-gray-400 text-xs">2 min ago</p>
                    </div>
                      </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-800">Vendor Update</p>
                      <p className="text-gray-600 text-xs">Catering confirmed arrival time</p>
                      <p className="text-gray-400 text-xs">5 min ago</p>
                      </div>
                    </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                      <p className="font-semibold text-gray-800">Sponsor Engagement</p>
                      <p className="text-gray-600 text-xs">TechCorp booth had 47 visitors</p>
                      <p className="text-gray-400 text-xs">12 min ago</p>
              </div>
            </div>
              </div>
            </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
