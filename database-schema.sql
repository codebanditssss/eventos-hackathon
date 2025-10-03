-- EventOS Database Schema
-- This file contains the SQL schema for setting up the Supabase database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('organizer', 'attendee', 'sponsor', 'vendor', 'volunteer')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('conference', 'workshop', 'meetup', 'exhibition', 'corporate', 'other')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  max_attendees INTEGER NOT NULL DEFAULT 0,
  current_attendees INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'live', 'completed', 'cancelled')) DEFAULT 'draft',
  organizer_id UUID REFERENCES public.profiles(id) NOT NULL,
  budget DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE public.sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  speaker TEXT,
  capacity INTEGER,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')) DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.profiles(id) NOT NULL,
  assigned_by UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors table
CREATE TABLE public.vendors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('catering', 'av', 'security', 'transportation', 'decorations', 'other')),
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'delivered', 'paid')) DEFAULT 'pending',
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsors table
CREATE TABLE public.sponsors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('platinum', 'gold', 'silver', 'bronze')),
  logo_url TEXT,
  website_url TEXT,
  contact_email TEXT NOT NULL,
  investment_amount DECIMAL(10,2) NOT NULL,
  benefits TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event attendees (many-to-many relationship)
CREATE TABLE public.event_attendees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  attendee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, attendee_id)
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'error', 'success')) DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event analytics table
CREATE TABLE public.event_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  total_attendees INTEGER NOT NULL DEFAULT 0,
  check_ins INTEGER NOT NULL DEFAULT 0,
  engagement_rate DECIMAL(5,2) DEFAULT 0,
  sponsor_impressions INTEGER DEFAULT 0,
  feedback_score DECIMAL(3,2),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI generated plans table
CREATE TABLE public.ai_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  plan_data JSONB NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback table
CREATE TABLE public.feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  attendee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Users can view events they're associated with" ON public.events
  FOR SELECT USING (
    organizer_id = auth.uid() OR
    id IN (
      SELECT event_id FROM public.event_attendees WHERE attendee_id = auth.uid()
    )
  );

CREATE POLICY "Organizers can manage their events" ON public.events
  FOR ALL USING (organizer_id = auth.uid());

-- Sessions policies
CREATE POLICY "Users can view sessions for events they have access to" ON public.sessions
  FOR SELECT USING (
    event_id IN (
      SELECT id FROM public.events WHERE organizer_id = auth.uid() OR
      id IN (SELECT event_id FROM public.event_attendees WHERE attendee_id = auth.uid())
    )
  );

CREATE POLICY "Organizers can manage sessions for their events" ON public.sessions
  FOR ALL USING (
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

-- Tasks policies
CREATE POLICY "Users can view tasks assigned to them or events they organize" ON public.tasks
  FOR SELECT USING (
    assigned_to = auth.uid() OR
    assigned_by = auth.uid() OR
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

CREATE POLICY "Users can update tasks assigned to them" ON public.tasks
  FOR UPDATE USING (assigned_to = auth.uid());

CREATE POLICY "Organizers can manage tasks for their events" ON public.tasks
  FOR ALL USING (
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

-- Vendors policies
CREATE POLICY "Organizers can manage vendors for their events" ON public.vendors
  FOR ALL USING (
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

-- Sponsors policies
CREATE POLICY "Organizers can manage sponsors for their events" ON public.sponsors
  FOR ALL USING (
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

-- Event attendees policies
CREATE POLICY "Users can view attendees for events they have access to" ON public.event_attendees
  FOR SELECT USING (
    event_id IN (
      SELECT id FROM public.events WHERE organizer_id = auth.uid() OR
      id IN (SELECT event_id FROM public.event_attendees WHERE attendee_id = auth.uid())
    )
  );

CREATE POLICY "Organizers can manage attendees for their events" ON public.event_attendees
  FOR ALL USING (
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Event analytics policies
CREATE POLICY "Organizers can view analytics for their events" ON public.event_analytics
  FOR SELECT USING (
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

-- AI plans policies
CREATE POLICY "Organizers can view AI plans for their events" ON public.ai_plans
  FOR SELECT USING (
    event_id IN (SELECT id FROM public.events WHERE organizer_id = auth.uid())
  );

-- Feedback policies
CREATE POLICY "Users can view feedback for events they have access to" ON public.feedback
  FOR SELECT USING (
    event_id IN (
      SELECT id FROM public.events WHERE organizer_id = auth.uid() OR
      id IN (SELECT event_id FROM public.event_attendees WHERE attendee_id = auth.uid())
    )
  );

CREATE POLICY "Attendees can create feedback for events they attended" ON public.feedback
  FOR INSERT WITH CHECK (
    attendee_id = auth.uid() AND
    event_id IN (
      SELECT event_id FROM public.event_attendees WHERE attendee_id = auth.uid()
    )
  );

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON public.vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON public.sponsors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', 'attendee');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
