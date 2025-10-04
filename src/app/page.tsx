'use client'

import Link from 'next/link'
import { 
  Zap, ArrowRight, Sparkles, Users, 
  Building2, BarChart3, MessageSquare, Calendar, Target,
  AlertCircle, Clock, ChevronRight, Brain, Network
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    animationDuration: number;
    animationDelay: number;
  }>>([])
  const heroRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
  }, [])

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    // Generate particles on client side only
    setParticles(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      animationDuration: Math.random() * 10 + 5,
      animationDelay: Math.random() * 5,
    })))
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleMouseMove, handleScroll])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 text-gray-900 relative overflow-hidden font-sans">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-3xl animate-blob-1"
          style={{ top: '10%', left: '10%', transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
        ></div>
        <div 
          className="absolute w-[700px] h-[700px] rounded-full bg-indigo-400/15 blur-3xl animate-blob-2"
          style={{ bottom: '15%', right: '10%', transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }}
        ></div>
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-cyan-400/15 blur-3xl animate-blob-3"
          style={{ top: '50%', left: '50%', transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)` }}
        ></div>
        {/* Floating Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-blue-400 opacity-30 animate-pulse-slow"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.animationDuration}s`,
              animationDelay: `${p.animationDelay}s`,
              transform: `translate(${mousePosition.x * 0.01 * (p.id % 2 === 0 ? 1 : -1)}px, ${mousePosition.y * 0.01 * (p.id % 3 === 0 ? 1 : -1)}px)`
            }}
          ></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Zap className="w-7 h-7 text-white" />
            </div>
              <span className="text-3xl font-extrabold text-gray-900">EventOS</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link 
                href="/auth/login"
                className="px-5 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors text-lg"
              >
                Log in
              </Link>
              <Link 
                href="/auth/signup"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg shadow-blue-500/30"
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20 text-center">
        {/* Floating Badge */}
        <div className="inline-flex items-center space-x-3 px-8 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200 text-lg font-semibold text-blue-700 mb-10 transform hover:scale-105 transition-transform duration-300 cursor-pointer group shadow-lg shadow-blue-500/20">
          <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
          <span>AI-Powered Event Management <ChevronRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" /></span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 md:mb-8 leading-tight tracking-tighter">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-shift">
            Transform
          </span> Your Events
          <br />with <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift-delay">EventOS AI</span>
          </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          Replace 10+ fragmented tools with one intelligent platform. Plan, manage, and optimize events like never before.
        </p>

        {/* CTA Button */}
        <div className="flex items-center justify-center mb-16">
          <Link 
            href="/auth/signup"
            className="px-16 py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold text-2xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-2xl shadow-blue-500/40 flex items-center space-x-3 group relative overflow-hidden"
          >
            <span className="relative z-10">Get Started Now</span>
            <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
            </Link>
        </div>

        {/* Dashboard Screenshot Preview */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="relative group">
            {/* Frame/Border with gradient glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            
            {/* Screenshot Container */}
            <div className="relative rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500">
              <img 
                src="/image.png" 
                alt="EventOS Mission Control Dashboard" 
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>



      {/* SOLUTION - Bento Grid Style Features */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-blue-100 backdrop-blur-xl border border-blue-300 mb-8">
              <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-blue-700 font-semibold">Powered by GPT-4</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
              One Platform. <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Infinite Power.</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Replace your entire event tech stack with AI-powered automation
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-6 auto-rows-fr">
            {/* Large Feature - Spans 2 columns, 2 rows */}
            <div className="col-span-12 md:col-span-7 md:row-span-2 group relative p-12 rounded-[3rem] bg-gradient-to-br from-blue-100 to-indigo-100 backdrop-blur-xl border border-blue-300 hover:border-blue-400 transition-all hover:scale-[1.02] cursor-pointer overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-5xl font-black text-gray-900 mb-4">AI Event Architect</h3>
                  <p className="text-gray-700 text-xl leading-relaxed mb-6">Plan complete events in 60 seconds. GPT-4 creates schedules, vendors, attendee lists, and timelines automatically.</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200 text-sm font-semibold text-blue-700">Auto-Planning</span>
                    <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200 text-sm font-semibold text-blue-700">Smart Templates</span>
                    <span className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200 text-sm font-semibold text-blue-700">Budget Optimization</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-bold">Explore AI Architect</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Medium Feature */}
            <div className="col-span-12 md:col-span-5 group relative p-8 rounded-[3rem] bg-gradient-to-br from-cyan-100 to-blue-100 backdrop-blur-xl border border-cyan-300 hover:border-cyan-400 transition-all hover:scale-[1.02] cursor-pointer shadow-xl">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
            </div>
              <h3 className="text-3xl font-black text-gray-900 mb-3">3D People Universe</h3>
              <p className="text-gray-700 text-lg">Interactive attendee constellation with AI networking</p>
          </div>

            {/* Medium Feature */}
            <div className="col-span-12 md:col-span-5 group relative p-8 rounded-[3rem] bg-gradient-to-br from-emerald-100 to-teal-100 backdrop-blur-xl border border-emerald-300 hover:border-emerald-400 transition-all hover:scale-[1.02] cursor-pointer shadow-xl">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
            </div>
              <h3 className="text-3xl font-black text-gray-900 mb-3">Vendor Autopilot</h3>
              <p className="text-gray-700 text-lg">Auto-coordinate suppliers, track payments, manage contracts</p>
          </div>

            {/* Wide Feature */}
            <div className="col-span-12 md:col-span-8 group relative p-10 rounded-[3rem] bg-gradient-to-br from-amber-100 to-orange-100 backdrop-blur-xl border border-amber-300 hover:border-amber-400 transition-all hover:scale-[1.02] cursor-pointer shadow-xl">
              <div className="flex items-start space-x-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform flex-shrink-0">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-black text-gray-900 mb-4">Predictive Analytics</h3>
                  <p className="text-gray-700 text-xl leading-relaxed">Know what happens before it does. AI predicts attendance, engagement, and revenue with 94% accuracy.</p>
                </div>
            </div>
          </div>

            {/* Tall Feature */}
            <div className="col-span-12 md:col-span-4 md:row-span-2 group relative p-8 rounded-[3rem] bg-gradient-to-br from-sky-100 to-blue-100 backdrop-blur-xl border border-sky-300 hover:border-sky-400 transition-all hover:scale-[1.02] cursor-pointer shadow-xl">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">Unified Comms</h3>
                  <p className="text-gray-700 text-lg mb-6">All messages, announcements, and updates in one intelligent hub</p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                      <span className="text-sm">Email Integration</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                      <span className="text-sm">SMS Automation</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                      <span className="text-sm">In-App Chat</span>
                    </div>
                  </div>
            </div>
          </div>
        </div>

            {/* Square Feature */}
            <div className="col-span-6 md:col-span-4 group relative p-8 rounded-[3rem] bg-gradient-to-br from-rose-100 to-pink-100 backdrop-blur-xl border border-rose-300 hover:border-rose-400 transition-all hover:scale-[1.02] cursor-pointer shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-gray-700">AI-optimized timelines</p>
            </div>

            {/* Square Feature */}
            <div className="col-span-6 md:col-span-4 group relative p-8 rounded-[3rem] bg-gradient-to-br from-violet-100 to-purple-100 backdrop-blur-xl border border-violet-300 hover:border-violet-400 transition-all hover:scale-[1.02] cursor-pointer shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Live Collaboration</h3>
              <p className="text-gray-700">Real-time team sync</p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 bg-white/80 backdrop-blur-lg mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">EventOS</span>
            </div>
            <div className="text-lg text-gray-600">
              © 2025 EventOS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles for animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-shift-delay {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-gradient-shift-delay {
          background-size: 200% 200%;
          animation: gradient-shift-delay 8s ease infinite;
        }
        @keyframes blob-animation-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes blob-animation-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 10px) scale(0.95); }
          66% { transform: translate(10px, -30px) scale(1.05); }
        }
        @keyframes blob-animation-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 40px) scale(1.03); }
          66% { transform: translate(-50px, -10px) scale(0.97); }
        }
        .animate-blob-1 { animation: blob-animation-1 15s infinite alternate; }
        .animate-blob-2 { animation: blob-animation-2 18s infinite alternate; }
        .animate-blob-3 { animation: blob-animation-3 12s infinite alternate; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse-slow 6s infinite ease-in-out; }
      `}</style>
    </div>
  )
}
