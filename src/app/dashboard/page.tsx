'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
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

// Simple Sparkline Component
const Sparkline = ({ data, color = "emerald" }: { data: number[], color?: string }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')
  
  const colorMap: Record<string, string> = {
    emerald: 'stroke-emerald-500',
    blue: 'stroke-blue-500',
    purple: 'stroke-purple-500',
    amber: 'stroke-amber-500'
  }
  
  return (
    <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        className={`${colorMap[color]} opacity-60`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface AIInsight {
  id: string
  type: 'critical' | 'opportunity' | 'prediction' | 'info'
  title: string
  message: string
  actions: {
    label: string
    type: 'primary' | 'secondary' | 'danger'
  }[]
  priority: number
}

export default function MissionControlDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(0)
  const [aiCopilotOpen, setAiCopilotOpen] = useState(false)
  const [dataFlow, setDataFlow] = useState(0)
  const [events, setEvents] = useState<any[]>([])
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  // AI Copilot state
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'Hi! I\'m your AI event assistant. How can I help you with your event today?' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  // Sparkline data (last 6 hours trend)
  const attendanceTrend = [720, 745, 780, 820, 865, 892]
  const sessionTrend = [1, 2, 2, 3, 3, 3]
  const engagementTrend = [75, 78, 82, 85, 87, 87]
  const progressTrend = [45, 50, 55, 60, 63, 65]

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('eventos-user')
    document.cookie = 'eventos-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    window.location.href = '/'
  }

  // Mock events as fallback (will be replaced by API data)
  const mockEvents = [
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

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        // For demo, using hardcoded user ID - replace with actual auth
        const userId = '00000000-0000-0000-0000-000000000000'
        const response = await fetch(`/api/events?userId=${userId}`)
        const data = await response.json()
        
        if (data.events && data.events.length > 0) {
          setEvents(data.events)
        } else {
          // Use mock data if no events found
          setEvents(mockEvents)
        }
      } catch (error) {
        console.error('Failed to fetch events:', error)
        // Fallback to mock data
        setEvents(mockEvents)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Fetch AI insights when event changes
  useEffect(() => {
    const fetchInsights = async () => {
      if (events.length === 0) return
      
      try {
        setIsLoadingInsights(true)
        const currentEvent = events[selectedEvent]
        
        const response = await fetch('/api/ai/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventData: {
              name: currentEvent.name,
              type: currentEvent.type,
              attendees: currentEvent.attendees,
              vendors: currentEvent.vendors,
              sessions: currentEvent.sessions,
              progress: currentEvent.progress,
              urgentTasks: currentEvent.urgentTasks
            }
          })
        })
        
        const data = await response.json()
        if (data.insights) {
          setAiInsights(data.insights)
        }
      } catch (error) {
        console.error('Failed to fetch AI insights:', error)
        // Keep existing insights or use empty array
      } finally {
        setIsLoadingInsights(false)
      }
    }

    // Fetch insights after a short delay to avoid too many API calls
    const timer = setTimeout(fetchInsights, 500)
    return () => clearTimeout(timer)
  }, [selectedEvent, events])

  const currentEvent = events[selectedEvent] || mockEvents[0]

  // Handle AI Copilot message
  const handleSendMessage = async () => {
    if (!chatInput.trim() || isSendingMessage) return

    const userMessage = chatInput.trim()
    setChatInput('')
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsSendingMessage(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...chatMessages,
            { role: 'user', content: userMessage }
          ],
          eventContext: currentEvent ? {
            name: currentEvent.name,
            type: currentEvent.type,
            status: currentEvent.status,
            attendees: currentEvent.attendees.registered,
            sessions: currentEvent.sessions.live,
            progress: currentEvent.progress
          } : undefined
        })
      })

      const data = await response.json()
      
      if (data.message) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      } else {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.' 
        }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting. Please try again.' 
      }])
    } finally {
      setIsSendingMessage(false)
    }
  }

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading EventOS...</h2>
          <p className="text-gray-600">Preparing your event command center</p>
        </div>
      </div>
    )
  }

  // Show empty state if no events
  if (events.length === 0) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 70%)
            `
          }}></div>
        </div>
        
        {/* Header */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-full mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">EventOS</span>
              </Link>
              <button className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                KD
              </button>
            </div>
          </div>
        </nav>

        {/* Empty State Content */}
        <div className="pt-20 flex items-center justify-center min-h-screen p-8">
          <div className="max-w-4xl w-full text-center">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to EventOS
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Your AI-powered event coordination platform. Replace 10+ tools with one intelligent system.
            </p>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              <Link 
                href="/dashboard/event-architect"
                className="group bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-12 h-12 mx-auto mb-4 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold mb-2">Create with AI</h3>
                <p className="text-blue-100">Let AI plan your perfect event in minutes</p>
              </Link>

              <button 
                onClick={() => setEvents(mockEvents)}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-500 transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-12 h-12 mx-auto mb-4 text-gray-600 group-hover:text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Start from Template</h3>
                <p className="text-gray-600">Choose from pre-built event templates</p>
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">People Management</h4>
                <p className="text-xs text-gray-600">Track attendees, speakers & staff</p>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200">
                <Building2 className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Vendor Coordination</h4>
                <p className="text-xs text-gray-600">Automate supplier management</p>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200">
                <BarChart3 className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Real-time Analytics</h4>
                <p className="text-xs text-gray-600">Live insights & predictions</p>
              </div>
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-200">
                <MessageSquare className="w-6 h-6 text-amber-600 mb-2" />
                <h4 className="font-semibold text-gray-900 text-sm mb-1">AI Assistant</h4>
                <p className="text-xs text-gray-600">24/7 intelligent support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  KD
                </button>
                
          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Khushi Diwan</p>
                <p className="text-xs text-gray-500">Event Organizer</p>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Mission Control Interface */}
      <div className="pt-14 min-h-screen flex overflow-y-auto">
        
        {/* Enhanced AI Copilot Sidebar */}
        {aiCopilotOpen && (
          <div className="w-96 bg-white/95 backdrop-blur-lg border-r border-blue-200 shadow-xl shadow-blue-500/10 flex flex-col h-screen">
            {/* AI Copilot Header */}
            <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-800">AI Event Copilot</h3>
                    <p className="text-sm text-blue-600">Your AI event assistant</p>
                  </div>
                </div>
                <button 
                  onClick={() => setAiCopilotOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 flex items-start space-x-2">
                <Target className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 font-medium">
                  Analyzing {currentEvent.name} • Trained on 10,000+ successful events
                </p>
              </div>
            </div>

            {/* AI Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, idx) => {
                // Strip markdown formatting
                const cleanContent = msg.content
                  .replace(/\*\*/g, '')  // Remove bold **
                  .replace(/\*/g, '')    // Remove italic *
                  .replace(/#{1,6}\s/g, '') // Remove headers #
                  .replace(/`{1,3}/g, '') // Remove code blocks ```
                  .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links [text](url) to text
                  .replace(/^[\-\*]\s/gm, '• ') // Convert list markers to bullets
                
                return (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-xl p-3 ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{cleanContent}</p>
                    </div>
                  </div>
                )
              })}
              
              {isSendingMessage && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-xl p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              )}
        </div>

            {/* AI Chat Input */}
            <div className="border-t border-blue-100 p-6 bg-gradient-to-r from-blue-50/50 to-emerald-50/50">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={isSendingMessage}
                  placeholder="Ask me anything about your event..."
                  className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm disabled:opacity-50"
                />
              <button
                  onClick={handleSendMessage}
                  disabled={isSendingMessage || !chatInput.trim()}
                  className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                <MessageSquare className="w-3 h-3 inline" /> Powered by EventOS AI • Press Enter to send
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
              
              {/* AI Insights Panel */}
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-2xl p-5 text-white shadow-2xl shadow-purple-500/30 border-2 border-purple-400/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center">
                      <Sparkles className={`w-5 h-5 text-white ${isLoadingInsights ? 'animate-spin' : 'animate-pulse'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">AI Insights</h3>
                      <p className="text-xs text-purple-200">
                        {isLoadingInsights ? 'Analyzing...' : 'Powered by EventOS AI'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                    {aiInsights.length || 3} New
                  </div>
                </div>
                
                <div className="space-y-2">
                  {isLoadingInsights ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-white/30 border-t-white rounded-full mx-auto"></div>
                      <p className="text-sm text-purple-200 mt-2">Generating AI insights...</p>
                    </div>
                  ) : aiInsights.length > 0 ? (
                    aiInsights.map((insight) => (
                      <div key={insight.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            insight.type === 'critical' ? 'bg-red-400 animate-pulse' :
                            insight.type === 'opportunity' ? 'bg-emerald-400' :
                            insight.type === 'prediction' ? 'bg-blue-400' :
                            'bg-yellow-400'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold">{insight.title}</span>
                              {insight.type === 'critical' && <AlertCircle className="w-4 h-4 text-red-300" />}
                              {insight.type === 'opportunity' && <TrendingUp className="w-4 h-4 text-emerald-300" />}
                              {insight.type === 'prediction' && <Target className="w-4 h-4 text-blue-300" />}
                            </div>
                            <p className="text-sm text-purple-100">{insight.message}</p>
                            {insight.actions && insight.actions.length > 0 && (
                              <div className="flex items-center space-x-2 mt-2">
                                {insight.actions.map((action, idx) => (
                                  <button
                                    key={idx}
                                    className={`text-xs px-3 py-1 rounded-lg font-semibold transition-colors ${
                                      action.type === 'danger' ? 'bg-red-500 hover:bg-red-600' :
                                      action.type === 'primary' ? 'bg-emerald-500 hover:bg-emerald-600' :
                                      'bg-white/20 hover:bg-white/30'
                                    }`}
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2">
                  {/* Insight 1 - Critical */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold">Critical Alert</span>
                          <AlertCircle className="w-4 h-4 text-red-300" />
                        </div>
                        <p className="text-sm text-purple-100">
                          Catering delay detected. Recommend contacting backup vendor <span className="font-bold">"QuickServe Catering"</span> for Hall B lunch service.
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg font-semibold transition-colors">
                            View Details
                          </button>
                          <button className="text-xs bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg font-semibold transition-colors">
                            Contact Vendor
                          </button>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Insight 2 - Positive */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold">Opportunity Detected</span>
                          <TrendingUp className="w-4 h-4 text-emerald-300" />
                        </div>
                        <p className="text-sm text-purple-100">
                          Opening keynote engagement at <span className="font-bold">98%</span> (18% above average). Consider extending Q&A by 15 minutes.
                        </p>
                        <button className="text-xs bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded-lg font-semibold mt-2 transition-colors">
                          Extend Session
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Insight 3 - Info */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold">Prediction</span>
                          <Target className="w-4 h-4 text-blue-300" />
                        </div>
                        <p className="text-sm text-purple-100">
                          Check-in rate is <span className="font-bold">12% above projection</span>. Expect <span className="font-bold">1,350 total attendees</span> by 2 PM (103 above capacity).
                        </p>
                        <button className="text-xs bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg font-semibold mt-2 transition-colors">
                          Adjust Capacity
                        </button>
                      </div>
                    </div>
                  </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Metrics Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Attendance</span>
                    <span className="text-emerald-600 flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-bold">12%</span>
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{currentEvent.attendees.checkedIn}</div>
                  <div className="text-sm text-gray-500 mb-2">of {currentEvent.attendees.registered} registered</div>
                  <Sparkline data={attendanceTrend} color="emerald" />
                  <div className="text-xs text-gray-400 mt-1">Last 6 hours</div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Live Sessions</span>
                    <span className="text-blue-600 flex items-center space-x-1">
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span className="font-bold">Active</span>
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{currentEvent.sessions.live}</div>
                  <div className="text-sm text-gray-500 mb-2">{currentEvent.sessions.upcoming} upcoming</div>
                  <Sparkline data={sessionTrend} color="blue" />
                  <div className="text-xs text-gray-400 mt-1">Session count</div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className="text-purple-600 font-bold">87%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">High</div>
                  <div className="text-sm text-gray-500 mb-2">Above average</div>
                  <Sparkline data={engagementTrend} color="purple" />
                  <div className="text-xs text-gray-400 mt-1">Trending up</div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-amber-600 font-bold">{currentEvent.progress}%</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">On Track</div>
                  <div className="text-sm text-gray-500 mb-2">Event milestone</div>
                  <Sparkline data={progressTrend} color="amber" />
                  <div className="text-xs text-gray-400 mt-1">Steady progress</div>
                </div>
              </div>

              {/* Main Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Attendee Flow Heatmap */}
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>Attendee Flow (Live)</span>
                  </h3>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                    {/* Flow Visualization */}
                    <div className="space-y-3">
                      {/* Main Hall - High Traffic */}
                      <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 text-white overflow-hidden">
                        <div className="absolute inset-0 opacity-30">
                          {[...Array(20)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="relative z-10">
                          <div className="text-xs font-bold opacity-90">Main Hall</div>
                          <div className="text-2xl font-bold">892</div>
                          <div className="text-xs opacity-90 flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>Very High Traffic</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Room A - Medium Traffic */}
                        <div className="relative bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg p-3 text-white overflow-hidden">
                          <div className="absolute inset-0 opacity-20">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 2}s`
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="relative z-10">
                            <div className="text-xs font-bold opacity-90">Room A</div>
                            <div className="text-xl font-bold">234</div>
                            <div className="text-xs opacity-90">Active</div>
                        </div>
                      </div>

                        {/* Expo Hall - Medium Traffic */}
                        <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg p-3 text-white overflow-hidden">
                          <div className="absolute inset-0 opacity-20">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 2}s`
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="relative z-10">
                            <div className="text-xs font-bold opacity-90">Expo Hall</div>
                            <div className="text-xl font-bold">156</div>
                            <div className="text-xs opacity-90 flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Steady</span>
                      </div>
                    </div>
                  </div>
                </div>

                      {/* Room B - Low Traffic */}
                      <div className="bg-gray-300 rounded-lg p-3 text-gray-700">
                        <div className="text-xs font-bold">Room B</div>
                        <div className="text-xl font-bold">0</div>
                        <div className="text-xs">Empty • Next: 2:00 PM</div>
                        </div>
                      </div>

                    <div className="mt-3 pt-3 border-t border-indigo-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 font-medium">Peak Movement:</span>
                        <span className="font-bold text-indigo-700">Main Hall → Expo (127/min)</span>
                    </div>
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
