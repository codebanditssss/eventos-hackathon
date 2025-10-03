'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EventArchitectDashboard() {
  const [step, setStep] = useState<'start' | 'questions' | 'generating' | 'blueprint'>('start')
  const [eventType, setEventType] = useState('')
  const [answers, setAnswers] = useState({
    eventName: '',
    eventType: '',
    attendees: '',
    budget: '',
    duration: '',
    goals: ''
  })

  const eventTemplates = [
    {
      id: 1,
      name: 'Tech Conference',
      icon: '💻',
      attendees: '500-2000',
      duration: '2-3 days',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Corporate Event',
      icon: '🏢',
      attendees: '100-500',
      duration: '1 day',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Wedding',
      icon: '💒',
      attendees: '50-300',
      duration: '1 day',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 4,
      name: 'Music Festival',
      icon: '🎵',
      attendees: '1000-10000',
      duration: '2-5 days',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      name: 'Networking Mixer',
      icon: '🤝',
      attendees: '50-200',
      duration: '3-4 hours',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 6,
      name: 'Workshop',
      icon: '📚',
      attendees: '20-100',
      duration: '1-2 days',
      color: 'from-amber-500 to-amber-600'
    }
  ]

  const startAIPlanning = () => {
    setStep('questions')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-purple-100 shadow-lg shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">EventOS</span>
                  <div className="text-xs text-purple-600 font-medium -mt-1">Event Architect</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-lg">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-purple-700 text-sm font-medium">AI Planning Assistant</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 bg-white/80 hover:bg-purple-50 text-purple-700 px-4 py-2 rounded-xl transition-colors border border-purple-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">Back to Mission Control</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Start Screen */}
          {step === 'start' && (
            <div className="space-y-12">
              {/* Hero Section */}
              <div className="text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  AI Event Architect
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Let AI plan your entire event in minutes. Answer a few questions and get a complete blueprint with timeline, budget, vendors, and venue layout.
                </p>
              </div>

              {/* Quick Start Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                
                {/* AI Planning */}
                <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-3xl p-8 shadow-xl shadow-purple-500/10 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                     onClick={startAIPlanning}>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Start with AI</h3>
                  <p className="text-gray-600 mb-6">Answer 5 quick questions and let AI generate your complete event blueprint</p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Begin AI Planning</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Template Library */}
                <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-3xl p-8 shadow-xl shadow-blue-500/10 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Use Template</h3>
                  <p className="text-gray-600 mb-6">Start with proven templates from 10,000+ successful events</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Browse Templates</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Event Templates Gallery */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Popular Event Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {eventTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-3xl`}>
                        {template.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{template.attendees} attendees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{template.duration}</span>
                        </div>
                      </div>
                      <button className="mt-4 w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-2 rounded-xl transition-all">
                        Use This Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Overview */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What You'll Get</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Complete Timeline</h3>
                    <p className="text-sm text-gray-600">Hour-by-hour schedule with all activities</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Budget Breakdown</h3>
                    <p className="text-sm text-gray-600">Smart allocation across all categories</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Vendor Checklist</h3>
                    <p className="text-sm text-gray-600">Required vendors with recommendations</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Venue Layout</h3>
                    <p className="text-sm text-gray-600">Optimized floor plan and seating</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Questions Step */}
          {step === 'questions' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-3xl p-12 shadow-xl shadow-purple-500/10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Let's Plan Your Event</h2>
                  <p className="text-gray-600">Answer these questions so AI can create the perfect blueprint for your event</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What's your event name?
                    </label>
                    <input
                      type="text"
                      value={answers.eventName}
                      onChange={(e) => setAnswers({...answers, eventName: e.target.value})}
                      placeholder="e.g., Tech Summit 2024"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What type of event is this?
                    </label>
                    <select
                      value={answers.eventType}
                      onChange={(e) => setAnswers({...answers, eventType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select event type...</option>
                      <option value="conference">Conference</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="festival">Music Festival</option>
                      <option value="networking">Networking Mixer</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How many attendees do you expect?
                    </label>
                    <input
                      type="number"
                      value={answers.attendees}
                      onChange={(e) => setAnswers({...answers, attendees: e.target.value})}
                      placeholder="e.g., 500"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What's your total budget? (USD)
                    </label>
                    <input
                      type="text"
                      value={answers.budget}
                      onChange={(e) => setAnswers({...answers, budget: e.target.value})}
                      placeholder="e.g., $50,000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How long will the event last?
                    </label>
                    <select
                      value={answers.duration}
                      onChange={(e) => setAnswers({...answers, duration: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select duration...</option>
                      <option value="half-day">Half Day (4 hours)</option>
                      <option value="full-day">Full Day (8 hours)</option>
                      <option value="2-days">2 Days</option>
                      <option value="3-days">3 Days</option>
                      <option value="week">1 Week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What are your main goals for this event?
                    </label>
                    <textarea
                      value={answers.goals}
                      onChange={(e) => setAnswers({...answers, goals: e.target.value})}
                      placeholder="e.g., Network with industry leaders, showcase our product, generate leads..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => setStep('start')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setStep('generating')
                      // Simulate AI generation
                      setTimeout(() => setStep('blueprint'), 3000)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-purple-500/25"
                  >
                    Generate AI Blueprint
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Generating Animation */}
          {step === 'generating' && (
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-3xl p-12 shadow-xl shadow-purple-500/10">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <svg className="w-12 h-12 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">AI is Planning Your Event</h2>
                <p className="text-gray-600 mb-8">Analyzing 10,000+ similar events to create your perfect blueprint...</p>
                <div className="space-y-3 text-left max-w-md mx-auto">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Generating timeline and schedule...</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Calculating optimal budget allocation...</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>Creating vendor requirements list...</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span>Designing venue layout...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blueprint Result - Placeholder */}
          {step === 'blueprint' && (
            <div className="text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Blueprint Generated!</h2>
                <p className="text-gray-600 mb-8">Your complete event plan is ready. This is where the detailed blueprint interface will appear.</p>
                <button
                  onClick={() => setStep('start')}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg"
                >
                  Start New Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

