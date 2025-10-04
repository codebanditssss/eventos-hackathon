'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CommunicationHubDashboard() {
  const [view, setView] = useState<'inbox' | 'compose' | 'channels' | 'announcements'>('inbox')
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'important'>('all')

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: 'Taksh Sehrawat',
      role: 'Speaker',
      lastMessage: 'Thanks! I\'ll be there 30 minutes early for the sound check.',
      timestamp: '2 min ago',
      unread: false,
      important: true,
      avatar: 'TS'
    },
    {
      id: 2,
      name: 'Vendor Group',
      role: 'Vendors',
      lastMessage: 'Catering team: Setup complete in Hall B',
      timestamp: '15 min ago',
      unread: true,
      important: false,
      avatar: 'VG',
      members: 12
    },
    {
      id: 3,
      name: 'TechCorp Sponsors',
      role: 'Sponsor',
      lastMessage: 'Can we schedule a meeting to discuss booth placement?',
      timestamp: '1 hour ago',
      unread: true,
      important: true,
      avatar: 'TC'
    },
    {
      id: 4,
      name: 'VIP Attendees',
      role: 'Attendees',
      lastMessage: 'Looking forward to the exclusive networking session!',
      timestamp: '2 hours ago',
      unread: false,
      important: false,
      avatar: 'VA',
      members: 45
    }
  ]

  // Mock channels
  const channels = [
    { id: 1, name: 'Event Team', members: 8, unread: 3, color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'All Speakers', members: 24, unread: 0, color: 'from-purple-500 to-purple-600' },
    { id: 3, name: 'Vendor Coordination', members: 12, unread: 5, color: 'from-emerald-500 to-emerald-600' },
    { id: 4, name: 'Sponsor Updates', members: 5, unread: 0, color: 'from-amber-500 to-amber-600' }
  ]

  // Mock announcements
  const announcements = [
    {
      id: 1,
      title: 'Welcome to Tech Summit 2024!',
      message: 'We\'re excited to have you here. Check-in starts at 8 AM.',
      recipients: 'All Attendees (1,247)',
      sent: '2 hours ago',
      status: 'sent',
      opens: 892,
      clicks: 234
    },
    {
      id: 2,
      title: 'Lunch Menu Updated',
      message: 'New vegetarian and vegan options now available.',
      recipients: 'All Attendees (1,247)',
      sent: '1 hour ago',
      status: 'sent',
      opens: 567,
      clicks: 89
    }
  ]

  // Mock message templates
  const templates = [
    { id: 1, name: 'Speaker Reminder', category: 'Speakers' },
    { id: 2, name: 'Vendor Check-in', category: 'Vendors' },
    { id: 3, name: 'Welcome Message', category: 'Attendees' },
    { id: 4, name: 'Sponsor Thank You', category: 'Sponsors' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-cyan-100 shadow-lg shadow-cyan-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent">EventOS</span>
                  <div className="text-xs text-cyan-600 font-medium -mt-1">Communication Hub</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-2 bg-cyan-50 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-cyan-700 text-sm font-medium">Unified Messaging</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Message Stats */}
              <div className="hidden lg:flex items-center space-x-4 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-700 text-sm font-semibold">3 Unread</span>
                </div>
                <div className="text-gray-300">|</div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="text-cyan-700 text-sm font-semibold">24 Active</span>
                </div>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm border border-cyan-200 rounded-xl p-1">
                <button
                  onClick={() => setView('inbox')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'inbox' 
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg' 
                      : 'text-cyan-700 hover:bg-cyan-50'
                  }`}
                >
                  Inbox
                </button>
                <button
                  onClick={() => setView('compose')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'compose' 
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg' 
                      : 'text-cyan-700 hover:bg-cyan-50'
                  }`}
                >
                  Compose
                </button>
                <button
                  onClick={() => setView('channels')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'channels' 
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg' 
                      : 'text-cyan-700 hover:bg-cyan-50'
                  }`}
                >
                  Channels
                </button>
                <button
                  onClick={() => setView('announcements')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'announcements' 
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg' 
                      : 'text-cyan-700 hover:bg-cyan-50'
                  }`}
                >
                  Announcements
                </button>
              </div>

              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 bg-white/80 hover:bg-cyan-50 text-cyan-700 px-4 py-2 rounded-xl transition-colors border border-cyan-200"
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

          {/* Inbox View */}
          {view === 'inbox' && (
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-150px)]">
              
              {/* Conversations List */}
              <div className="col-span-4 bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-3xl shadow-xl shadow-cyan-500/10 overflow-hidden flex flex-col">
                <div className="p-6 border-b border-cyan-100">
                  <h2 className="text-2xl font-bold text-cyan-800 mb-4">Messages</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setMessageFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        messageFilter === 'all' ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-700'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setMessageFilter('unread')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        messageFilter === 'unread' ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-700'
                      }`}
                    >
                      Unread (3)
                    </button>
                    <button
                      onClick={() => setMessageFilter('important')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        messageFilter === 'important' ? 'bg-cyan-600 text-white' : 'bg-cyan-50 text-cyan-700'
                      }`}
                    >
                      ⭐ Important
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`w-full p-4 border-b border-cyan-100 hover:bg-cyan-50 transition-colors text-left ${
                        selectedConversation === conv.id ? 'bg-cyan-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                          conv.unread ? 'bg-gradient-to-r from-cyan-600 to-cyan-700' : 'bg-gray-400'
                        }`}>
                          {conv.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-semibold ${conv.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                              {conv.name}
                            </span>
                            {conv.important && <span className="text-amber-500">⭐</span>}
                          </div>
                          <p className={`text-sm truncate ${conv.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                            {conv.lastMessage}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">{conv.timestamp}</span>
                            {conv.members && (
                              <span className="text-xs text-cyan-600 font-medium">{conv.members} members</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversation View */}
              <div className="col-span-8 bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-3xl shadow-xl shadow-cyan-500/10 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-6 border-b border-cyan-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-xl flex items-center justify-center text-white font-bold">
                            TS
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">Taksh Sehrawat</h3>
                            <p className="text-sm text-cyan-600">Speaker • Keynote</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors">
                            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {/* Received Message */}
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          TS
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-lg">
                            <p className="text-gray-800">Hi! Just confirming my keynote session tomorrow at 10 AM. Do I need to arrive earlier for setup?</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block">10:23 AM</span>
                        </div>
                      </div>

                      {/* Sent Message */}
                      <div className="flex items-start space-x-3 justify-end">
                        <div className="flex-1 flex flex-col items-end">
                          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl rounded-tr-none px-4 py-3 max-w-lg">
                            <p className="text-white">Hi Sarah! Yes, please arrive by 9:30 AM. We'll do a sound check and go over the presentation setup. Looking forward to your talk!</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">10:25 AM • Read</span>
                        </div>
                      </div>

                      {/* Received Message */}
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          TS
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-lg">
                            <p className="text-gray-800">Perfect! Thanks! I'll be there 30 minutes early for the sound check.</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block">10:27 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-6 border-t border-cyan-100">
                      <div className="flex items-end space-x-3">
                        <button className="p-3 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-colors">
                          <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </button>
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-cyan-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>
                        <button className="px-6 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-cyan-500/25">
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-lg font-medium">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Compose View */}
          {view === 'compose' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-3xl shadow-xl shadow-cyan-500/10 p-8">
                <h2 className="text-3xl font-bold text-cyan-800 mb-6">Compose Message</h2>
                
                <div className="space-y-6">
                  {/* Recipients */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Send To</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option>All Attendees (1,247)</option>
                      <option>All Speakers (24)</option>
                      <option>All Vendors (12)</option>
                      <option>All Sponsors (5)</option>
                      <option>VIP Attendees (45)</option>
                      <option>Custom Selection...</option>
                    </select>
                  </div>

                  {/* Template Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Use Template (Optional)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          className="bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl px-4 py-3 text-left transition-colors"
                        >
                          <div className="font-semibold text-gray-800">{template.name}</div>
                          <div className="text-xs text-cyan-600">{template.category}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={8}
                      placeholder="Write your message here..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    ></textarea>
                  </div>

                  {/* AI Assistant */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm text-blue-800 font-medium mb-2">💡 AI Suggestions:</p>
                        <div className="space-y-2">
                          <button className="text-sm text-blue-700 hover:text-blue-900 underline block">
                            "Add personalized greeting"
                          </button>
                          <button className="text-sm text-blue-700 hover:text-blue-900 underline block">
                            "Include event schedule link"
                          </button>
                          <button className="text-sm text-blue-700 hover:text-blue-900 underline block">
                            "Make tone more professional"
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Send Options */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                        <span className="text-sm text-gray-700">Send as SMS</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" checked readOnly />
                        <span className="text-sm text-gray-700">Send as Email</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" checked readOnly />
                        <span className="text-sm text-gray-700">In-app Notification</span>
                      </label>
                    </div>
                    <button className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/25">
                      Send to 1,247 Recipients
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Channels View */}
          {view === 'channels' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {channels.map((channel) => (
                <div key={channel.id} className="bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-3xl p-8 shadow-xl shadow-cyan-500/10 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${channel.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                        #
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">#{channel.name}</h3>
                        <p className="text-sm text-gray-600">{channel.members} members</p>
                      </div>
                    </div>
                    {channel.unread > 0 && (
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{channel.unread}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-sm text-gray-700 font-medium mb-1">Latest:</p>
                      <p className="text-sm text-gray-600">Setup complete, ready for tomorrow!</p>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                  </div>

                  <button className={`w-full bg-gradient-to-r ${channel.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-opacity`}>
                    Open Channel
                  </button>
                </div>
              ))}

              {/* Create New Channel */}
              <div className="bg-white/80 backdrop-blur-lg border-2 border-dashed border-cyan-300 rounded-3xl p-8 flex items-center justify-center hover:bg-cyan-50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-800 mb-2">Create New Channel</h3>
                  <p className="text-sm text-gray-600">Start a new group conversation</p>
                </div>
              </div>
            </div>
          )}

          {/* Announcements View */}
          {view === 'announcements' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-cyan-800">Broadcast Announcements</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/25">
                  Create Announcement
                </button>
              </div>

              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white/80 backdrop-blur-lg border border-cyan-200 rounded-3xl p-8 shadow-xl shadow-cyan-500/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{announcement.title}</h3>
                      <p className="text-gray-700 mb-4">{announcement.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>📤 Sent to: {announcement.recipients}</span>
                        <span>•</span>
                        <span>{announcement.sent}</span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                      announcement.status === 'sent' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {announcement.status === 'sent' ? '✓ Sent' : 'Draft'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-3xl font-bold text-blue-700 mb-1">{announcement.opens}</div>
                      <div className="text-sm text-gray-600">Opens ({Math.round((announcement.opens / 1247) * 100)}%)</div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <div className="text-3xl font-bold text-emerald-700 mb-1">{announcement.clicks}</div>
                      <div className="text-sm text-gray-600">Clicks ({Math.round((announcement.clicks / announcement.opens) * 100)}%)</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

