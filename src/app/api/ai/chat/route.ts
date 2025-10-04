import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages, eventContext } = body as { 
      messages: Message[]
      eventContext?: {
        name: string
        type: string
        status: string
        attendees: number
        sessions: number
        progress: number
      }
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 })
    }

    // Build system prompt with event context
    const systemPrompt = eventContext 
      ? `You are an AI assistant for EventOS, helping with event management. 
Current Event Context:
- Event: ${eventContext.name} (${eventContext.type})
- Status: ${eventContext.status}
- Attendees: ${eventContext.attendees}
- Live Sessions: ${eventContext.sessions}
- Progress: ${eventContext.progress}%

You help event organizers with:
- Event planning and logistics
- Attendee management
- Vendor coordination
- Schedule optimization
- Problem-solving
- Best practices

Be concise, actionable, and professional. Provide specific recommendations when possible.`
      : `You are an AI assistant for EventOS, an event management platform. Help users with event planning, management, and optimization. Be concise and actionable.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: false
    })

    const assistantMessage = response.choices[0].message.content

    return NextResponse.json({ 
      message: assistantMessage,
      usage: response.usage
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

