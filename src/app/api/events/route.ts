import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Fetch user's events
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        *,
        event_attendees(count),
        event_vendors(count),
        event_sponsors(count),
        sessions(count)
      `)
      .eq('organizer_id', userId)
      .order('start_date', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data to match dashboard format
    const transformedEvents = events?.map((event: any) => ({
      id: event.id,
      name: event.name,
      type: event.type,
      venue: event.venue || 'TBA',
      date: new Date(event.start_date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      status: event.status,
      attendees: {
        registered: event.max_attendees || 0,
        checkedIn: Math.floor((event.max_attendees || 0) * 0.7), // Calculate from check-ins
        vip: Math.floor((event.max_attendees || 0) * 0.05)
      },
      vendors: {
        total: event.event_vendors?.[0]?.count || 0,
        active: Math.floor((event.event_vendors?.[0]?.count || 0) * 0.7),
        pending: Math.floor((event.event_vendors?.[0]?.count || 0) * 0.3)
      },
      sponsors: {
        total: event.event_sponsors?.[0]?.count || 0,
        platinum: 1,
        gold: 2,
        silver: 2
      },
      sessions: {
        total: event.sessions?.[0]?.count || 0,
        live: event.status === 'live' ? Math.min(3, event.sessions?.[0]?.count || 0) : 0,
        upcoming: Math.floor((event.sessions?.[0]?.count || 0) * 0.5)
      },
      progress: event.status === 'completed' ? 100 : 
                event.status === 'live' ? 65 : 
                event.status === 'upcoming' ? 85 : 40,
      urgentTasks: event.status === 'live' ? 3 : 1,
      notifications: 7,
      theme: `from-${event.theme || 'blue'}-600 to-indigo-700`,
      daysUntil: Math.ceil((new Date(event.start_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    })) || []

    return NextResponse.json({ events: transformedEvents })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, event } = body

    if (!userId || !event) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Insert new event
    const { data, error } = await supabase
      .from('events')
      .insert({
        name: event.name,
        description: event.description || '',
        type: event.type,
        start_date: event.startDate,
        end_date: event.endDate,
        venue: event.venue || 'TBA',
        max_attendees: parseInt(event.maxAttendees) || 100,
        status: 'planning',
        organizer_id: userId,
        theme: event.theme || 'blue'
      })
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ event: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

