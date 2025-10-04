'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getUserProfile, updateUserProfile } from '@/lib/auth'
import { 
  Zap, CheckCircle2, User, Building2, MapPin, 
  Calendar, Target, Sparkles, ArrowRight, Rocket
} from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userRole, setUserRole] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    location: '',
    timezone: 'UTC',
    interests: [] as string[],
    eventTypes: [] as string[],
    bio: ''
  })

  // Load user data
  useEffect(() => {
    const loadUser = () => {
      // Check localStorage for user
      const userStr = localStorage.getItem('eventos-user')
      if (!userStr) {
        router.push('/auth/login')
        return
      }

      const user = JSON.parse(userStr)
      setUserRole(user.role || 'organizer')
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        organization: user.organization || ''
      }))
      setIsLoading(false)
    }

    loadUser()
  }, [router])

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    setIsLoading(true)
    
    // Update user in localStorage with onboarding data
    const userStr = localStorage.getItem('eventos-user')
    if (userStr) {
      const user = JSON.parse(userStr)
      const updatedUser = {
        ...user,
        ...formData,
        onboardingComplete: true
      }
      localStorage.setItem('eventos-user', JSON.stringify(updatedUser))
    }
    
    // Redirect based on role
    if (userRole === 'organizer') {
      window.location.href = '/dashboard/event-architect'
    } else {
      window.location.href = '/dashboard'
    }
  }

  const totalSteps = userRole === 'organizer' ? 4 : 3

  const interestOptions = [
    'Technology', 'Business', 'Education', 'Entertainment',
    'Sports', 'Arts & Culture', 'Networking', 'Charity'
  ]

  const eventTypeOptions = [
    'Conference', 'Workshop', 'Networking Event', 'Webinar',
    'Exhibition', 'Meetup', 'Product Launch', 'Festival'
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/30">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EventOS!</h1>
            <p className="text-gray-600">Let's set up your account in just a few steps</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1 ? 'bg-blue-600 text-white' :
                    step === index + 1 ? 'bg-blue-600 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {step > index + 1 ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step > index + 1 ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
            
            {/* Step 1: Profile Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                  <p className="text-gray-600">Help us personalize your experience</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                {userRole === 'organizer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your Company Name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What interests you?</h2>
                  <p className="text-gray-600">Select topics you're passionate about</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => {
                        const newInterests = formData.interests.includes(interest)
                          ? formData.interests.filter(i => i !== interest)
                          : [...formData.interests, interest]
                        setFormData({ ...formData, interests: newInterests })
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.interests.includes(interest)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Event Types (Organizers only) */}
            {step === 3 && userRole === 'organizer' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What events do you organize?</h2>
                  <p className="text-gray-600">Select the types of events you plan</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {eventTypeOptions.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        const newTypes = formData.eventTypes.includes(type)
                          ? formData.eventTypes.filter(t => t !== type)
                          : [...formData.eventTypes, type]
                        setFormData({ ...formData, eventTypes: newTypes })
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.eventTypes.includes(type)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Complete (Organizers) or Step 3 (Others) */}
            {((step === 4 && userRole === 'organizer') || (step === 3 && userRole !== 'organizer')) && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Rocket className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">You're all set!</h2>
                  <p className="text-gray-600 text-lg">
                    {userRole === 'organizer' 
                      ? "Let's create your first event with AI"
                      : "Ready to explore amazing events"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-3">What's next?</h3>
                  <ul className="space-y-2">
                    {userRole === 'organizer' ? (
                      <>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">Use AI to plan your perfect event</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">Manage attendees, vendors & sponsors</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">Get real-time insights & analytics</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">Discover events matching your interests</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">Register and manage your tickets</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">Connect with other attendees</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.name) ||
                  (step === 2 && formData.interests.length === 0)
                }
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center space-x-2"
              >
                <span>{step === totalSteps ? 'Get Started' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Skip for now */}
          {step < totalSteps && (
            <div className="text-center mt-4">
              <button
                onClick={handleComplete}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Skip for now →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

