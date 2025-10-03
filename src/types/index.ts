// User Types
export interface User {
  id: string
  email: string
  name: string
  role: 'organizer' | 'attendee' | 'sponsor' | 'vendor' | 'volunteer'
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Event Types
export interface Event {
  id: string
  name: string
  description: string
  type: 'conference' | 'workshop' | 'meetup' | 'exhibition' | 'corporate' | 'other'
  start_date: string
  end_date: string
  location: string
  max_attendees: number
  current_attendees: number
  status: 'draft' | 'published' | 'live' | 'completed' | 'cancelled'
  organizer_id: string
  budget?: number
  created_at: string
  updated_at: string
}

// Session Types
export interface Session {
  id: string
  event_id: string
  title: string
  description: string
  start_time: string
  end_time: string
  location: string
  speaker?: string
  capacity?: number
  status: 'scheduled' | 'live' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

// Task Types
export interface Task {
  id: string
  event_id: string
  title: string
  description: string
  assigned_to: string
  assigned_by: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date?: string
  created_at: string
  updated_at: string
}

// Vendor Types
export interface Vendor {
  id: string
  name: string
  type: 'catering' | 'av' | 'security' | 'transportation' | 'decorations' | 'other'
  contact_email: string
  contact_phone: string
  status: 'pending' | 'confirmed' | 'delivered' | 'paid'
  event_id: string
  created_at: string
  updated_at: string
}

// Sponsor Types
export interface Sponsor {
  id: string
  event_id: string
  name: string
  tier: 'platinum' | 'gold' | 'silver' | 'bronze'
  logo_url?: string
  website_url?: string
  contact_email: string
  investment_amount: number
  benefits: string[]
  created_at: string
  updated_at: string
}

// Analytics Types
export interface EventAnalytics {
  event_id: string
  total_attendees: number
  check_ins: number
  engagement_rate: number
  sponsor_impressions: number
  feedback_score: number
  generated_at: string
}

// Notification Types
export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  read: boolean
  created_at: string
}

// AI Generated Types
export interface AIEventPlan {
  timeline: Array<{
    time: string
    activity: string
    assigned_to?: string
    notes?: string
  }>
  budget_breakdown: Array<{
    category: string
    amount: number
    vendor?: string
  }>
  vendor_checklist: Array<{
    vendor_type: string
    tasks: string[]
    deadline: string
  }>
  risk_mitigation: Array<{
    risk: string
    mitigation_strategy: string
    contingency_plan: string
  }>
}

export interface FeedbackSummary {
  sentiment: 'positive' | 'negative' | 'neutral'
  themes: string[]
  improvements: string[]
  strengths: string[]
  recommendations: string[]
}
