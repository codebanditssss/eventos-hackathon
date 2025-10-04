'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VendorCommandDashboard() {
  const [view, setView] = useState<'board' | 'timeline' | 'payments'>('board')

  // Mock vendor data
  const vendors = [
    {
      id: 1,
      name: 'Gourmet Catering Co.',
      category: 'Catering',
      status: 'on-track',
      contact: 'chef@gourmet.com',
      phone: '+1 (555) 123-4567',
      deliveryTime: 'Mar 15, 8:00 AM',
      tasks: { completed: 3, total: 5 },
      payment: { amount: 12500, paid: 5000, status: 'partial' },
      rating: 4.8,
      avatar: 'GC',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 2,
      name: 'ProAV Solutions',
      category: 'Audio/Visual',
      status: 'delayed',
      contact: 'tech@proav.com',
      phone: '+1 (555) 234-5678',
      deliveryTime: 'Mar 15, 6:00 AM',
      tasks: { completed: 2, total: 6 },
      payment: { amount: 8000, paid: 8000, status: 'paid' },
      rating: 4.5,
      avatar: 'PA',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      name: 'Elite Security Services',
      category: 'Security',
      status: 'on-track',
      contact: 'ops@elitesec.com',
      phone: '+1 (555) 345-6789',
      deliveryTime: 'Mar 15, 7:00 AM',
      tasks: { completed: 4, total: 4 },
      payment: { amount: 6000, paid: 3000, status: 'partial' },
      rating: 5.0,
      avatar: 'ES',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      name: 'FlowerPower Decorations',
      category: 'Decorations',
      status: 'pending',
      contact: 'design@flowerpower.com',
      phone: '+1 (555) 456-7890',
      deliveryTime: 'Mar 15, 9:00 AM',
      tasks: { completed: 0, total: 3 },
      payment: { amount: 4500, paid: 0, status: 'pending' },
      rating: 4.6,
      avatar: 'FP',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 5,
      name: 'Swift Transportation',
      category: 'Logistics',
      status: 'on-track',
      contact: 'dispatch@swift.com',
      phone: '+1 (555) 567-8901',
      deliveryTime: 'Mar 15, 5:00 AM',
      tasks: { completed: 2, total: 2 },
      payment: { amount: 3000, paid: 3000, status: 'paid' },
      rating: 4.9,
      avatar: 'ST',
      color: 'from-emerald-500 to-emerald-600'
    }
  ]

  const stats = {
    totalVendors: 12,
    onTrack: 7,
    delayed: 2,
    pending: 3,
    totalBudget: 45000,
    paid: 28000,
    pendingPayment: 17000
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'on-track': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'delayed': return 'bg-red-100 text-red-700 border-red-200'
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700'
      case 'partial': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-amber-100 text-amber-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">EventOS</span>
                  <div className="text-xs text-purple-600 font-medium -mt-1">Vendor Command</div>
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-purple-700 text-sm font-medium">{stats.onTrack} On Track, {stats.delayed} Delayed</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Switcher */}
              <div className="flex items-center bg-white/60 backdrop-blur-sm border border-purple-200 rounded-xl p-1">
                <button
                  onClick={() => setView('board')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'board' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                      : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  Status Board
                </button>
                <button
                  onClick={() => setView('timeline')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'timeline' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                      : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setView('payments')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'payments' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                      : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  Payments
                </button>
              </div>

              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 bg-white/80 hover:bg-purple-50 text-purple-700 px-4 py-2 rounded-xl transition-colors border border-purple-200"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalVendors}</div>
              <div className="text-sm text-gray-600">Total Vendors</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-emerald-700 mb-1">{stats.onTrack}</div>
              <div className="text-sm text-gray-600">On Track</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-red-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-red-700 mb-1">{stats.delayed}</div>
              <div className="text-sm text-gray-600">Delayed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-amber-700 mb-1">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>

          {/* Status Board View */}
          {view === 'board' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* On Track Column */}
              <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-3xl p-6 shadow-xl shadow-emerald-500/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-emerald-800 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>On Track</span>
                  </h3>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                    {vendors.filter(v => v.status === 'on-track').length}
                  </span>
                </div>

                <div className="space-y-4">
                  {vendors.filter(v => v.status === 'on-track').map((vendor) => (
                    <div key={vendor.id} className="bg-white border border-emerald-100 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${vendor.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-sm">{vendor.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">{vendor.name}</h4>
                            <p className="text-xs text-gray-600">{vendor.category}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Delivery:</span>
                          <span className="font-semibold text-gray-800">{vendor.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tasks:</span>
                          <span className="font-semibold text-emerald-700">{vendor.tasks.completed}/{vendor.tasks.total}</span>
                        </div>
                        <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-emerald-500 h-1.5 rounded-full" 
                            style={{ width: `${(vendor.tasks.completed / vendor.tasks.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-lg text-xs font-medium transition-colors">
                          Contact
                        </button>
                        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-xs font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delayed Column */}
              <div className="bg-white/80 backdrop-blur-lg border border-red-200 rounded-3xl p-6 shadow-xl shadow-red-500/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-red-800 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Delayed</span>
                  </h3>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                    {vendors.filter(v => v.status === 'delayed').length}
                  </span>
                </div>

                <div className="space-y-4">
                  {vendors.filter(v => v.status === 'delayed').map((vendor) => (
                    <div key={vendor.id} className="bg-white border border-red-100 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${vendor.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-sm">{vendor.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">{vendor.name}</h4>
                            <p className="text-xs text-gray-600">{vendor.category}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                        <p className="text-xs text-red-700 font-medium">⚠️ Equipment setup running 2h behind schedule</p>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Delivery:</span>
                          <span className="font-semibold text-red-700">{vendor.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tasks:</span>
                          <span className="font-semibold text-red-700">{vendor.tasks.completed}/{vendor.tasks.total}</span>
                        </div>
                        <div className="w-full bg-red-100 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-red-500 h-1.5 rounded-full" 
                            style={{ width: `${(vendor.tasks.completed / vendor.tasks.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg text-xs font-medium transition-colors">
                          🚨 Urgent Call
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-medium transition-colors">
                          Escalate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Column */}
              <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-3xl p-6 shadow-xl shadow-amber-500/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-amber-800 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span>Pending</span>
                  </h3>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                    {vendors.filter(v => v.status === 'pending').length}
                  </span>
                </div>

                <div className="space-y-4">
                  {vendors.filter(v => v.status === 'pending').map((vendor) => (
                    <div key={vendor.id} className="bg-white border border-amber-100 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${vendor.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-sm">{vendor.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">{vendor.name}</h4>
                            <p className="text-xs text-gray-600">{vendor.category}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Delivery:</span>
                          <span className="font-semibold text-gray-800">{vendor.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tasks:</span>
                          <span className="font-semibold text-amber-700">{vendor.tasks.completed}/{vendor.tasks.total}</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-amber-500 h-1.5 rounded-full" 
                            style={{ width: `${(vendor.tasks.completed / vendor.tasks.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <button className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-700 py-2 rounded-lg text-xs font-medium transition-colors">
                          Follow Up
                        </button>
                        <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-xs font-medium transition-colors">
                          Assign Tasks
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Timeline View */}
          {view === 'timeline' && (
            <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-3xl p-8 shadow-xl shadow-purple-500/10">
              <h2 className="text-2xl font-bold text-purple-800 mb-8 text-center">Vendor Delivery Timeline</h2>
              
              <div className="space-y-6">
                {vendors.sort((a, b) => a.deliveryTime.localeCompare(b.deliveryTime)).map((vendor, index) => (
                  <div key={vendor.id} className="relative">
                    {/* Timeline Line */}
                    {index < vendors.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-full bg-purple-200"></div>
                    )}

                    <div className="flex items-start space-x-6">
                      {/* Time Circle */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${vendor.color} flex items-center justify-center shadow-lg`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>

                      {/* Event Card */}
                      <div className="flex-1 bg-white border border-purple-100 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{vendor.name}</h3>
                            <p className="text-sm text-gray-600">{vendor.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-purple-700">{vendor.deliveryTime}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(vendor.status)}`}>
                              {vendor.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Contact</p>
                            <p className="font-semibold text-gray-800">{vendor.contact}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Progress</p>
                            <p className="font-semibold text-gray-800">{vendor.tasks.completed}/{vendor.tasks.total} tasks</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Rating</p>
                            <p className="font-semibold text-gray-800">⭐ {vendor.rating}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payments View */}
          {view === 'payments' && (
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <p className="text-sm text-gray-600 mb-2">Total Budget</p>
                  <p className="text-3xl font-bold text-gray-800">${stats.totalBudget.toLocaleString()}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-lg border border-emerald-200 rounded-2xl p-6 shadow-lg">
                  <p className="text-sm text-gray-600 mb-2">Paid</p>
                  <p className="text-3xl font-bold text-emerald-700">${stats.paid.toLocaleString()}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-lg border border-amber-200 rounded-2xl p-6 shadow-lg">
                  <p className="text-sm text-gray-600 mb-2">Pending</p>
                  <p className="text-3xl font-bold text-amber-700">${stats.pendingPayment.toLocaleString()}</p>
                </div>
              </div>

              {/* Payment Table */}
              <div className="bg-white/80 backdrop-blur-lg border border-purple-200 rounded-3xl p-8 shadow-xl shadow-purple-500/10">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Payment Status</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Vendor</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Paid</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Remaining</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((vendor) => (
                        <tr key={vendor.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 bg-gradient-to-r ${vendor.color} rounded-full flex items-center justify-center`}>
                                <span className="text-white font-bold text-xs">{vendor.avatar}</span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-800">{vendor.name}</div>
                                <div className="text-sm text-gray-600">{vendor.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-bold text-gray-800">${vendor.payment.amount.toLocaleString()}</td>
                          <td className="py-4 px-4 text-emerald-700 font-semibold">${vendor.payment.paid.toLocaleString()}</td>
                          <td className="py-4 px-4 text-amber-700 font-semibold">${(vendor.payment.amount - vendor.payment.paid).toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${getPaymentStatusColor(vendor.payment.status)}`}>
                              {vendor.payment.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {vendor.payment.status !== 'paid' && (
                              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                                Process Payment
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

