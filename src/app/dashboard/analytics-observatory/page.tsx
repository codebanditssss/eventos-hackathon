'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AnalyticsObservatoryDashboard() {
  const [view, setView] = useState<'overview' | 'sponsors' | 'insights'>('overview')
  const [timeRange, setTimeRange] = useState<'live' | 'day' | 'week' | 'all'>('live')

  // Mock analytics data
  const liveMetrics = {
    activeAttendees: 892,
    sessionEngagement: 87,
    sponsorImpressions: 12453,
    networkingConnections: 234,
    feedbackScore: 4.6,
    socialMentions: 1247
  }

  const sponsors = [
    {
      id: 1,
      name: 'TechCorp',
      tier: 'Platinum',
      investment: 25000,
      impressions: 8234,
      boothVisits: 456,
      leads: 89,
      engagement: 92,
      roi: 340,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 2,
      name: 'InnovateLabs',
      tier: 'Gold',
      investment: 15000,
      impressions: 5127,
      boothVisits: 287,
      leads: 54,
      engagement: 78,
      roi: 245,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 3,
      name: 'StartupHub',
      tier: 'Silver',
      investment: 8000,
      impressions: 2943,
      boothVisits: 156,
      leads: 32,
      engagement: 65,
      roi: 180,
      color: 'from-gray-400 to-gray-500'
    }
  ]

  const aiInsights = [
    {
      id: 1,
      type: 'success',
      title: 'Peak Engagement Detected',
      description: 'Session "AI in Product Development" had 98% engagement - 23% above average. Consider similar topics for future events.',
      impact: 'high',
      icon: '📈'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Sponsor Booth Traffic Low',
      description: 'StartupHub booth has 40% below expected traffic. Suggest announcing their product demo at 2 PM.',
      impact: 'medium',
      icon: '⚠️'
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Networking Surge Opportunity',
      description: '234 attendees showing high networking activity. Perfect time to announce speed networking session.',
      impact: 'high',
      icon: '💡'
    },
    {
      id: 4,
      type: 'prediction',
      title: 'Post-Event Satisfaction Forecast',
      description: 'Based on current metrics, predicted NPS score: 67 (Excellent). 89% likely to attend next year.',
      impact: 'high',
      icon: '🔮'
    }
  ]

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'high': return 'border-l-4 border-emerald-500'
      case 'medium': return 'border-l-4 border-amber-500'
      case 'low': return 'border-l-4 border-blue-500'
      default: return 'border-l-4 border-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 15% 85%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-amber-100 shadow-lg shadow-amber-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">EventOS</span>
                  <div className="text-xs text-amber-600 font-medium -mt-1">Analytics Observatory</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-amber-700 text-sm font-medium">Real-time Analytics</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm border border-amber-200 rounded-xl p-1">
                <button
                  onClick={() => setTimeRange('live')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    timeRange === 'live' 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Live
                </button>
                <button
                  onClick={() => setTimeRange('day')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    timeRange === 'day' 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    timeRange === 'week' 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Week
                </button>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm border border-amber-200 rounded-xl p-1">
                <button
                  onClick={() => setView('overview')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'overview' 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setView('sponsors')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'sponsors' 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Sponsors ROI
                </button>
                <button
                  onClick={() => setView('insights')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'insights' 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg' 
                      : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  AI Insights
                </button>
              </div>

              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 bg-white/80 hover:bg-amber-50 text-amber-700 px-4 py-2 rounded-xl transition-colors border border-amber-200"
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

          {/* Overview View */}
          {view === 'overview' && (
            <div className="space-y-8">
              
              {/* Live Metrics Grid */}
              <div>
                <h2 className="text-3xl font-bold text-amber-800 mb-6">Live Event Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  
                  <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-2">👥</div>
                    <div className="text-3xl font-bold text-emerald-700 mb-1">{liveMetrics.activeAttendees}</div>
                    <div className="text-sm text-gray-600">Active Now</div>
                    <div className="mt-2 flex items-center text-xs text-emerald-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>+12% vs last hour</span>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-2">⚡</div>
                    <div className="text-3xl font-bold text-blue-700 mb-1">{liveMetrics.sessionEngagement}%</div>
                    <div className="text-sm text-gray-600">Engagement</div>
                    <div className="mt-2 flex items-center text-xs text-blue-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>Excellent</span>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-2">👁️</div>
                    <div className="text-3xl font-bold text-purple-700 mb-1">{liveMetrics.sponsorImpressions.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sponsor Views</div>
                    <div className="mt-2 flex items-center text-xs text-purple-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>+8% vs target</span>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-2">🤝</div>
                    <div className="text-3xl font-bold text-cyan-700 mb-1">{liveMetrics.networkingConnections}</div>
                    <div className="text-sm text-gray-600">Connections</div>
                    <div className="mt-2 flex items-center text-xs text-cyan-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <span>+34 this hour</span>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-2">⭐</div>
                    <div className="text-3xl font-bold text-amber-700 mb-1">{liveMetrics.feedbackScore}</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                    <div className="mt-2 flex items-center text-xs text-amber-600">
                      <span>237 reviews</span>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg border border-pink-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-3xl font-bold text-pink-700 mb-1">{liveMetrics.socialMentions.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Social Buzz</div>
                    <div className="mt-2 flex items-center text-xs text-pink-600">
                      <span>#TechSummit trending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Engagement Over Time */}
                <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-3xl p-8 shadow-xl shadow-amber-500/10">
                  <h3 className="text-xl font-bold text-amber-800 mb-6">Engagement Over Time</h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[65, 72, 78, 85, 87, 90, 87, 92, 89, 87, 91, 94].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-lg transition-all hover:from-amber-600 hover:to-amber-500"
                          style={{ height: `${value}%` }}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2">{index + 9}:00</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attendee Distribution */}
                <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-3xl p-8 shadow-xl shadow-blue-500/10">
                  <h3 className="text-xl font-bold text-blue-800 mb-6">Attendee Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">VIP Attendees</span>
                        <span className="font-bold text-amber-700">45 (4%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full" style={{ width: '4%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Speakers</span>
                        <span className="font-bold text-blue-700">24 (2%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Sponsors</span>
                        <span className="font-bold text-purple-700">12 (1%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{ width: '1%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Regular Attendees</span>
                        <span className="font-bold text-emerald-700">1,166 (93%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full" style={{ width: '93%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800 font-medium">💡 Regular attendees showing 18% higher engagement than VIPs</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-700 mb-4">Top Performing Session</h4>
                  <p className="text-lg font-bold text-emerald-800 mb-1">AI in Product Development</p>
                  <p className="text-sm text-gray-600">98% engagement • 456 attendees</p>
                </div>
                <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-700 mb-4">Most Popular Sponsor</h4>
                  <p className="text-lg font-bold text-purple-800 mb-1">TechCorp</p>
                  <p className="text-sm text-gray-600">8,234 impressions • 456 booth visits</p>
                </div>
                <div className="bg-white/80 backdrop-blur-lg border border-blue-200 rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-700 mb-4">Predicted NPS Score</h4>
                  <p className="text-lg font-bold text-blue-800 mb-1">67 (Excellent)</p>
                  <p className="text-sm text-gray-600">89% likely to return next year</p>
                </div>
              </div>
            </div>
          )}

          {/* Sponsors ROI View */}
          {view === 'sponsors' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Sponsor ROI Dashboard</h2>

              {/* Sponsor Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-3xl p-8 shadow-xl shadow-amber-500/10 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{sponsor.name}</h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${sponsor.color} bg-clip-text text-transparent`}>
                          {sponsor.tier} Sponsor
                        </p>
                      </div>
                      <div className={`w-16 h-16 bg-gradient-to-r ${sponsor.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                        {sponsor.name.substring(0, 1)}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Investment</span>
                        <span className="text-lg font-bold text-gray-800">${sponsor.investment.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">ROI</span>
                        <span className="text-2xl font-bold text-emerald-700">{sponsor.roi}%</span>
                      </div>

                      <div className="pt-4 border-t border-gray-200 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Brand Impressions</span>
                          <span className="font-semibold text-gray-800">{sponsor.impressions.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Booth Visits</span>
                          <span className="font-semibold text-gray-800">{sponsor.boothVisits}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Leads Generated</span>
                          <span className="font-semibold text-gray-800">{sponsor.leads}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Engagement Rate</span>
                          <span className="font-semibold text-gray-800">{sponsor.engagement}%</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="text-xs text-gray-600 mb-2">Overall Performance</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${sponsor.color} h-2 rounded-full`}
                            style={{ width: `${sponsor.engagement}%` }}
                          ></div>
                        </div>
                      </div>

                      <button className={`w-full bg-gradient-to-r ${sponsor.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity mt-4`}>
                        Generate Full Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ROI Comparison */}
              <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-3xl p-8 shadow-xl shadow-amber-500/10">
                <h3 className="text-xl font-bold text-amber-800 mb-6">ROI Comparison</h3>
                <div className="h-64 flex items-end justify-between space-x-8">
                  {sponsors.map((sponsor) => (
                    <div key={sponsor.id} className="flex-1 flex flex-col items-center">
                      <div className="text-lg font-bold text-emerald-700 mb-2">{sponsor.roi}%</div>
                      <div 
                        className={`w-full bg-gradient-to-t ${sponsor.color} rounded-t-xl`}
                        style={{ height: `${(sponsor.roi / 400) * 100}%` }}
                      ></div>
                      <span className="text-sm text-gray-800 font-medium mt-3">{sponsor.name}</span>
                      <span className="text-xs text-gray-600">{sponsor.tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Insights View */}
          {view === 'insights' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-amber-800">AI-Powered Insights</h2>
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-xl">
                  <svg className="w-5 h-5 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-blue-700 text-sm font-medium">Analyzing 12,453 data points</span>
                </div>
              </div>

              {/* AI Insights Cards */}
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className={`bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${getImpactColor(insight.impact)}`}>
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{insight.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{insight.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            insight.impact === 'high' ? 'bg-emerald-100 text-emerald-700' :
                            insight.impact === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {insight.impact.toUpperCase()} IMPACT
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{insight.description}</p>
                        <div className="flex items-center space-x-3">
                          <button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-amber-700 hover:to-amber-800 transition-all">
                            Take Action
                          </button>
                          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sentiment Analysis */}
              <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-3xl p-8 shadow-xl shadow-emerald-500/10">
                <h3 className="text-xl font-bold text-emerald-800 mb-6">Live Sentiment Analysis</h3>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">😊</div>
                    <div className="text-3xl font-bold text-emerald-700">78%</div>
                    <div className="text-sm text-gray-600">Positive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">😐</div>
                    <div className="text-3xl font-bold text-gray-700">18%</div>
                    <div className="text-sm text-gray-600">Neutral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">😞</div>
                    <div className="text-3xl font-bold text-red-700">4%</div>
                    <div className="text-sm text-gray-600">Negative</div>
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-sm text-emerald-800 font-medium">
                    📊 Overall sentiment is 23% more positive than similar events. Top keywords: "amazing", "insightful", "well-organized"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

