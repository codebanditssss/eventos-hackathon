'use client'

import Link from 'next/link'
import { 
  Zap, ArrowRight, CheckCircle2, Sparkles, Users, 
  Building2, BarChart3, MessageSquare, Calendar, Target,
  Rocket, Star
} from 'lucide-react'

export default function LandingPage() {
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

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">EventOS</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Log in
              </Link>
              <Link 
                href="/auth/signup"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg shadow-blue-500/30"
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Event Management</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Replace <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">10+ Tools</span>
            <br />with One AI Platform
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            EventOS eliminates event coordination chaos. Plan, manage, and optimize events with AI-powered insights and automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link 
              href="/auth/signup"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center space-x-2"
            >
              <span>Start for Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-blue-500 flex items-center justify-center space-x-2"
            >
              <span>View Demo</span>
              <Rocket className="w-5 h-5" />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-2">Trusted by organizers</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="hidden sm:block">10,000+ events powered</div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">The Event Coordination Crisis</h2>
            <p className="text-lg text-gray-700">
              <strong>45% of event failures</strong> are due to planning and coordination breakdowns.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-amber-200">
              <div className="text-4xl mb-3">😫</div>
              <h3 className="font-bold text-gray-900 mb-2">10+ Fragmented Tools</h3>
              <p className="text-sm text-gray-600">Organizers juggle spreadsheets, emails, and multiple platforms</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-amber-200">
              <div className="text-4xl mb-3">💸</div>
              <h3 className="font-bold text-gray-900 mb-2">Data Silos & Chaos</h3>
              <p className="text-sm text-gray-600">Information scattered across tools leads to missed opportunities</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-amber-200">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold text-gray-900 mb-2">Manual Coordination</h3>
              <p className="text-sm text-gray-600">Hours wasted on vendor management and attendee communication</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need, One Platform</h2>
          <p className="text-xl text-gray-600">AI-powered tools that actually work together</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Event Planning</h3>
            <p className="text-gray-600">GPT-4 powered assistant plans your event in minutes, not days</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">People Universe</h3>
            <p className="text-gray-600">Interactive attendee management with AI-powered networking</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Vendor Automation</h3>
            <p className="text-gray-600">Automated coordination, quotes, and payment tracking</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Analytics</h3>
            <p className="text-gray-600">Live dashboards with predictive insights and sponsor ROI</p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Communication</h3>
            <p className="text-gray-600">All messages, announcements, and updates in one place</p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all hover:scale-105">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Scheduling</h3>
            <p className="text-gray-600">AI-optimized timelines that prevent conflicts</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Events?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of organizers using AI to plan better events</p>
          <Link 
            href="/auth/signup"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-xl"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-blue-200 mt-4">No credit card required • Set up in 2 minutes</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 bg-white/80 backdrop-blur-lg mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EventOS</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 EventOS. AI-Powered Event Management Platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
