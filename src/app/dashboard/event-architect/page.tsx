'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Blueprint {
  eventName: string
  eventType: string
  timeline: Array<{ phase: string; duration: string; tasks: string[] }>
  budget: Array<{ category: string; amount: string; percentage: number }>
  vendors: Array<{ type: string; recommendations: string[]; estimated: string }>
  venue: { layout: string; capacity: string; features: string[] }
  marketing: string[]
  risks: Array<{ risk: string; mitigation: string }>
}

export default function EventArchitectDashboard() {
  const [step, setStep] = useState<'start' | 'questions' | 'generating' | 'blueprint'>('start')
  const [answers, setAnswers] = useState({
    eventName: '',
    eventType: '',
    attendees: '',
    budget: '',
    duration: '',
    goals: ''
  })
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const startAIPlanning = () => {
    setStep('questions')
  }

  const generateBlueprint = async () => {
    setStep('generating')
    setIsGenerating(true)

    try {
      const response = await fetch('/api/ai/blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })

      const data = await response.json()

      if (data.blueprint) {
        setBlueprint(data.blueprint)
      } else {
        // Fallback to generated blueprint if API fails
        setBlueprint(generateFallbackBlueprint())
      }
    } catch (error) {
      console.error('Blueprint generation error:', error)
      // Use fallback blueprint
      setBlueprint(generateFallbackBlueprint())
    } finally {
      setTimeout(() => {
        setIsGenerating(false)
        setStep('blueprint')
      }, 2000)
    }
  }

  const generateFallbackBlueprint = (): Blueprint => {
    return {
      eventName: answers.eventName || 'Your Event',
      eventType: answers.eventType,
      timeline: [
        {
          phase: 'Pre-Planning (3 months before)',
          duration: '3 months',
          tasks: [
            'Define event objectives and KPIs',
            'Create preliminary budget',
            'Research and shortlist venues',
            'Identify key speakers/performers',
            'Draft sponsorship packages'
          ]
        },
        {
          phase: 'Planning & Logistics (2 months before)',
          duration: '2 months',
          tasks: [
            'Finalize venue and sign contracts',
            'Confirm speakers and entertainment',
            'Launch registration system',
            'Start marketing campaigns',
            'Book catering and AV equipment'
          ]
        },
        {
          phase: 'Execution (1 month before)',
          duration: '1 month',
          tasks: [
            'Finalize event schedule',
            'Send attendee communications',
            'Confirm all vendor deliveries',
            'Conduct site visit and walkthrough',
            'Prepare emergency response plan'
          ]
        },
        {
          phase: 'Event Day',
          duration: '1 day',
          tasks: [
            'Setup and registration',
            'Coordinate vendors and staff',
            'Monitor attendee experience',
            'Capture content (photos/videos)',
            'Handle real-time issues'
          ]
        },
        {
          phase: 'Post-Event',
          duration: '2 weeks',
          tasks: [
            'Send thank you emails',
            'Collect feedback surveys',
            'Analyze event metrics',
            'Process vendor payments',
            'Create post-event report'
          ]
        }
      ],
      budget: [
        { category: 'Venue & Facilities', amount: `$${Math.round(parseInt(answers.budget || '10000') * 0.30)}`, percentage: 30 },
        { category: 'Catering & F&B', amount: `$${Math.round(parseInt(answers.budget || '10000') * 0.25)}`, percentage: 25 },
        { category: 'Marketing & Promotion', amount: `$${Math.round(parseInt(answers.budget || '10000') * 0.15)}`, percentage: 15 },
        { category: 'Entertainment & Speakers', amount: `$${Math.round(parseInt(answers.budget || '10000') * 0.15)}`, percentage: 15 },
        { category: 'Technology & AV', amount: `$${Math.round(parseInt(answers.budget || '10000') * 0.10)}`, percentage: 10 },
        { category: 'Contingency', amount: `$${Math.round(parseInt(answers.budget || '10000') * 0.05)}`, percentage: 5 }
      ],
      vendors: [
        {
          type: 'Venue',
          recommendations: ['Convention Center Downtown', 'Grand Hotel Ballroom', 'Tech Park Conference Hall'],
          estimated: `$${Math.round(parseInt(answers.budget || '10000') * 0.30)}`
        },
        {
          type: 'Catering',
          recommendations: ['Premium Catering Co.', 'Gourmet Events', 'Fresh & Local Catering'],
          estimated: `$${Math.round(parseInt(answers.budget || '10000') * 0.25)}`
        },
        {
          type: 'AV & Technology',
          recommendations: ['EventTech Solutions', 'Pro Audio Visual', 'Digital Events Inc.'],
          estimated: `$${Math.round(parseInt(answers.budget || '10000') * 0.10)}`
        },
        {
          type: 'Photography',
          recommendations: ['Elite Event Photography', 'Capture Moments Pro', 'Event Lens Studio'],
          estimated: `$${Math.round(parseInt(answers.budget || '10000') * 0.05)}`
        }
      ],
      venue: {
        layout: 'Theater style with breakout rooms',
        capacity: answers.attendees || '500',
        features: [
          'High-speed WiFi (1Gbps)',
          'Professional sound system',
          'LED screens and projectors',
          'Backstage green rooms',
          'Catering prep areas',
          'Registration desk space',
          'Accessible facilities'
        ]
      },
      marketing: [
        'Create event website with registration',
        'Launch social media campaign (LinkedIn, Twitter, Instagram)',
        'Email marketing to target audience (3 campaigns)',
        'Partner with industry influencers',
        'Press release to relevant media',
        'Paid advertising (Google Ads, Facebook Ads)',
        'Early bird discount promotion',
        'Referral program for attendees'
      ],
      risks: [
        {
          risk: 'Low attendance',
          mitigation: 'Early bird pricing, aggressive marketing, partnerships with industry groups'
        },
        {
          risk: 'Speaker cancellation',
          mitigation: 'Have backup speakers confirmed, video recording option, panel format flexibility'
        },
        {
          risk: 'Technical failures',
          mitigation: 'Backup equipment on-site, dedicated tech support team, pre-event testing'
        },
        {
          risk: 'Weather issues (outdoor elements)',
          mitigation: 'Indoor backup spaces, weather insurance, clear communication plan'
        },
        {
          risk: 'Budget overruns',
          mitigation: '5% contingency fund, regular budget reviews, vendor contract clauses'
        }
      ]
    }
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
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-purple-100 shadow-lg shadow-purple-500/10">
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
            </div>

            <Link 
              href="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Start Screen */}
        {step === 'start' && (
          <div className="text-center">
            <div className="max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-purple-700 font-semibold">Powered by GPT-4</span>
              </div>
              
              <h1 className="text-6xl font-black text-gray-800 mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Event Architect</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-8">
                Let AI plan your entire event in minutes. Answer a few questions and get a complete blueprint with timeline, budget, vendors, and venue layout.
              </p>
            </div>

            {/* Quick Start Button */}
            <button
              onClick={startAIPlanning}
              className="inline-flex items-center space-x-3 px-12 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-2xl shadow-purple-500/40 group"
            >
              <span>Start AI Planning</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
              <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">60-Second Planning</h3>
                <p className="text-gray-600">Complete event blueprint generated in under a minute</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Proven Templates</h3>
                <p className="text-gray-600">Based on 10,000+ successful events worldwide</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Budget Optimization</h3>
                <p className="text-gray-600">Smart allocation across all event categories</p>
              </div>
            </div>
          </div>
        )}

        {/* Questions Screen */}
        {step === 'questions' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/90 backdrop-blur-lg border border-purple-200 rounded-3xl p-10 shadow-2xl shadow-purple-500/10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Tell Us About Your Event</h2>
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
                    placeholder="e.g., Tech Summit 2025"
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
                    <option value="conference">Tech Conference</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding</option>
                    <option value="festival">Music Festival</option>
                    <option value="networking">Networking Mixer</option>
                    <option value="workshop">Workshop/Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    How many attendees do you expect?
                  </label>
                  <input
                    type="text"
                    value={answers.attendees}
                    onChange={(e) => setAnswers({...answers, attendees: e.target.value})}
                    placeholder="e.g., 500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What's your budget? ($)
                  </label>
                  <input
                    type="text"
                    value={answers.budget}
                    onChange={(e) => setAnswers({...answers, budget: e.target.value})}
                    placeholder="e.g., 50000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event duration?
                  </label>
                  <select
                    value={answers.duration}
                    onChange={(e) => setAnswers({...answers, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select duration...</option>
                    <option value="halfday">Half day (4 hours)</option>
                    <option value="fullday">Full day (8 hours)</option>
                    <option value="2days">2 days</option>
                    <option value="3days">3 days</option>
                    <option value="week">1 week</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What are your main goals?
                  </label>
                  <textarea
                    value={answers.goals}
                    onChange={(e) => setAnswers({...answers, goals: e.target.value})}
                    placeholder="e.g., Networking, product launch, education..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-8">
                <button
                  onClick={() => setStep('start')}
                  className="flex-shrink-0 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={generateBlueprint}
                  disabled={!answers.eventName || !answers.eventType || !answers.budget}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <span>Calculating optimal budget allocation...</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  <span>Creating vendor requirements list...</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  <span>Designing venue layout...</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                  <span>Planning marketing strategy...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blueprint Display */}
        {step === 'blueprint' && blueprint && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-white/80">Blueprint Generated!</div>
                  <h1 className="text-4xl font-black">{blueprint.eventName}</h1>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{answers.attendees} attendees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>${answers.budget} budget</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Event Timeline</span>
              </h2>
              <div className="space-y-6">
                {blueprint.timeline.map((phase, idx) => (
                  <div key={idx} className="border-l-4 border-purple-500 pl-6 py-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{phase.phase}</h3>
                    <p className="text-sm text-gray-600 mb-3">Duration: {phase.duration}</p>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, tidx) => (
                        <li key={tidx} className="flex items-start space-x-2 text-gray-700">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Budget Allocation</span>
              </h2>
              <div className="space-y-4">
                {blueprint.budget.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800">{item.category}</span>
                      <span className="text-gray-600">{item.amount} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendors */}
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Recommended Vendors</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {blueprint.vendors.map((vendor, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{vendor.type}</h3>
                    <p className="text-sm text-gray-600 mb-3">Estimated: {vendor.estimated}</p>
                    <ul className="space-y-2">
                      {vendor.recommendations.map((rec, ridx) => (
                        <li key={ridx} className="flex items-center space-x-2 text-gray-700">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Layout */}
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Venue Requirements</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Layout Style:</span>
                  <p className="text-gray-600">{blueprint.venue.layout}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">Capacity:</span>
                  <p className="text-gray-600">{blueprint.venue.capacity} people</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">Required Features:</span>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    {blueprint.venue.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-700">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Strategy */}
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <span>Marketing Strategy</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {blueprint.marketing.map((strategy, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-pink-50 rounded-xl">
                    <svg className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-gray-700">{strategy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Risk Management</span>
              </h2>
              <div className="space-y-4">
                {blueprint.risks.map((risk, idx) => (
                  <div key={idx} className="border-l-4 border-red-500 pl-6 py-2">
                    <h3 className="font-bold text-gray-800 mb-1">Risk: {risk.risk}</h3>
                    <p className="text-gray-600">Mitigation: {risk.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <button
                onClick={() => {
                  setStep('start')
                  setAnswers({
                    eventName: '',
                    eventType: '',
                    attendees: '',
                    budget: '',
                    duration: '',
                    goals: ''
                  })
                  setBlueprint(null)
                }}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all"
              >
                Create New Blueprint
              </button>
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
