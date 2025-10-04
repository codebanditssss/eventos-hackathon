import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export interface EventData {
  name: string
  type: string
  attendees: {
    registered: number
    checkedIn: number
    vip: number
  }
  vendors: {
    total: number
    active: number
    pending: number
  }
  sessions: {
    total: number
    live: number
    upcoming: number
  }
  progress: number
  urgentTasks: number
}

export interface AIInsight {
  id: string
  type: 'critical' | 'opportunity' | 'prediction' | 'info'
  title: string
  message: string
  actions: {
    label: string
    type: 'primary' | 'secondary' | 'danger'
  }[]
  priority: number
}

export async function generateAIInsights(eventData: EventData): Promise<AIInsight[]> {
  try {
    const prompt = `You are an AI assistant for EventOS, an event management platform. Analyze this event data and provide 3 actionable insights:

Event: ${eventData.name} (${eventData.type})
- Registered: ${eventData.attendees.registered} | Checked In: ${eventData.attendees.checkedIn}
- Live Sessions: ${eventData.sessions.live} | Upcoming: ${eventData.sessions.upcoming}
- Active Vendors: ${eventData.vendors.active} | Pending: ${eventData.vendors.pending}
- Progress: ${eventData.progress}%
- Urgent Tasks: ${eventData.urgentTasks}

Provide exactly 3 insights in this JSON format:
[
  {
    "type": "critical" | "opportunity" | "prediction" | "info",
    "title": "Short title (2-4 words)",
    "message": "Detailed actionable insight (1-2 sentences)",
    "actions": [{"label": "Action text", "type": "primary" | "secondary" | "danger"}]
  }
]

Focus on:
1. Critical issues that need immediate attention
2. Opportunities to improve the event
3. Predictions based on current trends

Return ONLY the JSON array, no other text.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert event management AI that provides actionable insights. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('No content in OpenAI response')
    }

    const insights = JSON.parse(content)
    
    // Add IDs and priority
    return insights.map((insight: any, index: number) => ({
      id: `insight-${Date.now()}-${index}`,
      ...insight,
      priority: index + 1
    }))
  } catch (error) {
    console.error('Error generating AI insights:', error)
    
    // Return fallback insights if API fails
    return [
      {
        id: 'fallback-1',
        type: 'critical',
        title: 'Check-in Rate',
        message: `Currently ${Math.round((eventData.attendees.checkedIn / eventData.attendees.registered) * 100)}% checked in. Monitor for any delays.`,
        actions: [{ label: 'View Details', type: 'primary' }],
        priority: 1
      },
      {
        id: 'fallback-2',
        type: 'info',
        title: 'Session Status',
        message: `${eventData.sessions.live} sessions currently live with ${eventData.sessions.upcoming} upcoming.`,
        actions: [{ label: 'View Schedule', type: 'secondary' }],
        priority: 2
      },
      {
        id: 'fallback-3',
        type: 'opportunity',
        title: 'Event Progress',
        message: `Event is ${eventData.progress}% complete and on track to finish successfully.`,
        actions: [{ label: 'View Progress', type: 'primary' }],
        priority: 3
      }
    ]
  }
}

export async function generateEventDescription(eventDetails: {
  type: string
  duration: string
  attendees: string
  goals: string
}): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an event planning assistant. Generate professional event descriptions.'
        },
        {
          role: 'user',
          content: `Generate a concise event description for:
Type: ${eventDetails.type}
Duration: ${eventDetails.duration}
Expected Attendees: ${eventDetails.attendees}
Goals: ${eventDetails.goals}

Keep it under 3 sentences.`
        }
      ],
      temperature: 0.8,
      max_tokens: 150
    })

    return response.choices[0].message.content || 'Professional event hosted via EventOS platform.'
  } catch (error) {
    console.error('Error generating description:', error)
    return `${eventDetails.type} event for ${eventDetails.attendees} attendees. ${eventDetails.goals}`
  }
}
